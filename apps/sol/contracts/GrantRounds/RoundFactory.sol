// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.0;

import "./RoundImplementation.sol";
import "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// import "./utils/MetaPtr.sol";

/**
 * @notice Invoked by a RoundOperator to enable creation of a
 * round by cloning the RoundImplementation contract.
 * The factory contract emits an event anytime a round is created
 * which can be used to derive the round registry.
 *
 * @dev RoundFactory is deployed once per chain and stores
 * a reference to the deployed RoundImplementation.
 * @dev RoundFactory uses openzeppelin Clones to reduce deploy
 * costs and also allows uprgrading RoundContract
 * @dev This contract is Ownable thus supports ownership transfership
 *
 */
contract RoundFactory is OwnableUpgradeable {
    // -- Storage --

    address public roundContract;

    address public latestRoundContract;

    // --- Event ---

    /// @notice Emitted when a Round contract is updated
    event RoundContractUpdated(address roundAddress);

    /// @notice Emitted when a new Round is created
    event RoundCreated(
        address indexed roundAddress,
        address indexed roundImplementation
    );

    /// @notice initialize function which ensure caller is set as owner
    /// to be called by timelock.
    function initialize() external initializer {
        __Context_init_unchained();
        __Ownable_init_unchained();
    }

    // --- Core methods ---

    /**
     * @notice Allows the owner to update the RoundImplementation.
     * This provides us the flexibility to upgrade RoundImplementation
     * contract while relying on the same RoundFactory to get the list of
     * rounds.
     * @param newRoundContract New RoundImplementation contract address
     */
    function updateRoundContract(address newRoundContract) external onlyOwner {
        require(newRoundContract != address(0), "roundContract is 0x");

        roundContract = newRoundContract;
        emit RoundContractUpdated(newRoundContract);
    }

    /**
     * @notice Clones RoundImp a new round and emits event
     *
     * @param encodedParameters Encoded parameters for creating a round
     */
    function create(
        bytes calldata encodedParameters
    ) external payable onlyOwner returns (address) {
        require(roundContract != address(0), "roundContract is 0x");

        address clone = ClonesUpgradeable.clone(roundContract);
        latestRoundContract = clone;

        emit RoundCreated(clone, roundContract);

        address[] memory admins = new address[](1);
        admins[0] = msg.sender;

        RoundImplementation(payable(clone)).initialize(
            encodedParameters,
            admins
        );

        return clone;
    }
}
