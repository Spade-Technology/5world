// SPDX-License-Identifier: NONE

pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./interfaces/VTokenInterface.sol";

/**
 * @title - A retroactive ERC20 token distribution contract
 * @notice - Provided an EIP712 compliant signed message & token claim, distributes V tokens
 **/

contract TokenDistributor {
    // --- Storgae ---

    /// @notice public key for backend signing private key
    address public immutable signer;

    /// @notice address of V token to distribute
    address public immutable vToken;

    /// @notice timestamp when contract is deployed
    uint public immutable deployTime;

    /// @notice V Dao treasury address to transfer the unclaimed token to
    address public immutable treasury;

    /// @notice the root of a Merkle tree used to verify the eligibility of recipients
    bytes32 public immutable merkleRoot;

    /// @notice hash of the domain separator
    bytes32 DOMAIN_SEPARATOR;

    //// @notice This is a packed array of booleans.
    mapping(uint256 => uint256) private claimedBitMap;

    /// @notice EIP712 domain struct
    struct EIP712Domain {
        string name;
        string version;
        uint256 chainId;
        address verifyingContract;
    }

    // --- Constants ---

    /// @notice  How long will this contract process token claims? 30 days
    uint public constant CONTRACT_ACTIVE = 30 days;

    /// @notice  as required by EIP712, we create type hash that will be rolled up into the final signed message
    bytes32 constant EIP712DOMAIN_TYPEHASH =
        keccak256(
            "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
        );

    /// @notice  typehash for our token claim - matches the Claim struct
    bytes32 constant DAO_TOKEN_CLAIM_TYPEHASH =
        keccak256(
            "Claim(uint32 user_id,address user_address,uint256 user_amount,address delegate_address,bytes32 leaf)"
        );

    // --- Events ---

    /// @notice This event is triggered when a call to ClaimTokens succeeds.
    event Claimed(
        uint256 user_id,
        address account,
        uint256 amount,
        bytes32 leaf
    );

    /// @notice  This event is triggered when unclaimed drops are moved to Timelock after CONTRACT_ACTIVE period
    event TransferUnclaimed(uint256 amount);

    // --- Constructor ---

    /**
     * @notice Construct a new TokenDistribution contract
     * @param _signer - public key matching the private key that will be signing claims
     * @param _vToken - address of ERC20 that claims will be distributed from
     * @param _treasury - address of the timelock contract where unclaimed funds will be swept
     **/
    constructor(
        address _vToken,
        address _signer,
        address _treasury,
        bytes32 _merkleRoot
    ) {
        signer = _signer;
        vToken = _vToken;
        merkleRoot = _merkleRoot;
        treasury = _treasury;
        deployTime = block.timestamp;

        DOMAIN_SEPARATOR = hash(
            EIP712Domain({
                name: "V Dao",
                version: "1.0.0",
                chainId: 1,
                verifyingContract: address(this)
            })
        );
    }

    // --- Core Methods ---

    /**
     * @notice process incoming token claims, must be signed by <signer>
     * @param user_id - serves as nonce - only one claim per user_id
     * @param user_address - ethereum account token claim will be transfered too
     * @param user_amount - amount user will receive, in wei
     * @param delegate_address - address token claim will be deletaged too
     * @param eth_signed_message_hash_hex - EIP712 pre-signed message hash payload
     * @param eth_signed_signature_hex = eth_sign style, EIP712 compliant, signed message
     * @param merkleProof - proof hashes for leaf
     * @param leaf - leaf hash for user claim in merkle tree
     **/
    function claimTokens(
        uint32 user_id,
        address user_address,
        uint256 user_amount,
        address delegate_address,
        bytes32 eth_signed_message_hash_hex,
        bytes memory eth_signed_signature_hex,
        bytes32[] calldata merkleProof,
        bytes32 leaf
    ) external {
        // only accept claim if msg.sender address is in signed claim
        require(
            msg.sender == user_address,
            "TokenDistributor: Must be msg sender."
        );

        // one claim per user
        require(
            !isClaimed(user_id),
            "TokenDistributor: Tokens already claimed."
        );

        // claim must provide a message signed by defined <signer>
        require(
            isSigned(eth_signed_message_hash_hex, eth_signed_signature_hex),
            "TokenDistributor: Valid Signature Required."
        );

        bytes32 hashed_base_claim = keccak256(
            abi.encode(
                DAO_TOKEN_CLAIM_TYPEHASH,
                user_id,
                user_address,
                user_amount,
                delegate_address,
                leaf
            )
        );

        bytes32 digest = keccak256(
            abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, hashed_base_claim)
        );

        // can we reproduce the same hash from the raw claim metadata?
        require(
            digest == eth_signed_message_hash_hex,
            "TokenDistributor: Claim Hash Mismatch."
        );

        // can we repoduce leaf hash included in the claim?
        bytes32 leaf_hash = keccak256(
            abi.encode(keccak256(abi.encode(user_id, user_amount)))
        );
        require(leaf == leaf_hash, "TokenDistributor: Leaf Hash Mismatch.");

        // does the leaf exist on our tree?
        require(
            MerkleProof.verify(merkleProof, merkleRoot, leaf),
            "TokenDistributor: Valid Proof Required."
        );

        // process token claim !!
        _delegateTokens(user_address, delegate_address);
        _setClaimed(user_id);

        require(
            IERC20(vToken).transfer(user_address, user_amount),
            "TokenDistributor: Transfer failed."
        );
        emit Claimed(user_id, user_address, user_amount, leaf);
    }

    /**
     * @notice checks claimedBitMap to see if if user_id is 0/1
     * @dev fork from uniswap merkle distributor, unmodified
     * @return - boolean
     **/
    function isClaimed(uint256 index) public view returns (bool) {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        uint256 claimedWord = claimedBitMap[claimedWordIndex];
        uint256 mask = (1 << claimedBitIndex);
        return claimedWord & mask == mask;
    }

    /**
     * @notice used to move any remaining tokens out of the contract after expiration
     **/
    function transferUnclaimed() public {
        require(
            block.timestamp >= deployTime + CONTRACT_ACTIVE,
            "TokenDistributor: Contract is still active."
        );
        // transfer all 5THW to TimeLock
        uint remainingBalance = IERC20(vToken).balanceOf(address(this));
        require(
            IERC20(vToken).transfer(treasury, remainingBalance),
            "TokenDistributor: Transfer unclaimed failed."
        );
        emit TransferUnclaimed(remainingBalance);
    }

    /**
     * @notice verify that a message was signed by the holder of the private keys of a given address
     * @return true if message was signed by signer designated on contstruction, else false
     **/
    function isSigned(
        bytes32 eth_signed_message_hash_hex,
        bytes memory eth_signed_signature_hex
    ) internal view returns (bool) {
        address untrusted_signer = ECDSA.recover(
            eth_signed_message_hash_hex,
            eth_signed_signature_hex
        );
        return untrusted_signer == signer;
    }

    /**
     * @notice - function can be used to create DOMAIN_SEPARATORs
     * @dev - from EIP712 spec, unmodified
     **/
    function hash(
        EIP712Domain memory eip712Domain
    ) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    EIP712DOMAIN_TYPEHASH,
                    keccak256(bytes(eip712Domain.name)),
                    keccak256(bytes(eip712Domain.version)),
                    eip712Domain.chainId,
                    eip712Domain.verifyingContract
                )
            );
    }

    /**
     * @notice Sets a given user_id to claimed
     * @dev taken from uniswap merkle distributor, unmodified
     **/
    function _setClaimed(uint256 index) private {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        claimedBitMap[claimedWordIndex] =
            claimedBitMap[claimedWordIndex] |
            (1 << claimedBitIndex);
    }

    /**
     * @notice execute call on token contract to delegate tokens
     */
    function _delegateTokens(address delegator, address delegatee) private {
        VTokenInterface(vToken).delegateOnDist(delegator, delegatee);
    }
}
