// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Importing necessary contracts from OpenZeppelin library.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Arrays.sol";

// Custom errors that can be thrown by the contract.
error NonTransferable();
error InvalidDonatinTiers();

// Main smart contract for managing donations and minting SBTs
contract VDonations is ERC721, ERC721Enumerable, AccessControl {
    using Counters for Counters.Counter;
    using Strings for uint256;

    /// @notice Constant role identifier for the MINTER_ROLE.
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /// @notice Counter for generating token ids.
    Counters.Counter private _toRoundFactorykenIdCounter;

    /// @notice Base URI for the donations SBTs.
    string private baseURI;

    /// @notice donated amount(in US$) for all the donator.
    mapping(address => uint256) public donated;

    /// @notice Tier for different donation SBTs
    uint256[] public donationTier;

    /// @notice Emitted when a Donation is made.
    event DonationUpdated(
        address indexed donator,
        uint256 oldDonatedAmount,
        uint256 newDonatedAmount
    );

    /// @notice Emitted when Donation Tiers are updated
    event DonationTierUpdated(uint256[] newDonationTier);

    /// @notice Emitted when Base URI for donations SBTs are updated
    event BaseURIUpdated(string newBaseURI);

    /**
     * @notice Constructor for initializing the contract.
     * @param guardian_ timelock contract address with admin Roles
     * @param treasury_ VDao treasury address
     * @param donationTier_ Array of limit for different donation tier
     * @param baseURI_ Base URI for donation SBTs
     */
    constructor(
        address guardian_,
        address treasury_,
        uint256[] memory donationTier_,
        string memory baseURI_
    ) ERC721("V Dao Donation", "V DONATION") {
        if (donationTier_.length == 0) {
            revert InvalidDonatinTiers();
        }
        // Grant admin roles to guardian_ and MINTER_ROLE to treasury_.
        _grantRole(DEFAULT_ADMIN_ROLE, guardian_);
        _grantRole(MINTER_ROLE, treasury_);

        _updateDonationTier(donationTier_);
        _updateBaseURI(baseURI_);
    }

    /// @notice Get Base URI for SBT
    /// @return Base URI
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /**
     * @notice Get the token URI for a token Id
     * @param tokenId id for a SBT
     * @return Token URI
     */
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        address owner = ownerOf(tokenId);
        uint256 donatedAmount = donated[owner];

        uint256 tier = Arrays.findUpperBound(donationTier, donatedAmount);
        if (
            donationTier[tier == donationTier.length ? tier - 1 : tier] ==
            donatedAmount
        ) {
            tier++;
        }

        if (tier == 0) return "";

        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tier.toString()))
                : "";
    }

    /**
     * @notice Get the token URI for a owner
     * @param owner address of the SBT owner (PS: a user can own atmost 1 SBT)
     * @return Token URI
     */
    function tokenURIByAddress(
        address owner
    ) public view returns (string memory) {
        uint256 donatedAmount = donated[owner];

        uint256 tier = Arrays.findUpperBound(donationTier, donatedAmount);
        if (
            donationTier[tier == donationTier.length ? tier - 1 : tier] ==
            donatedAmount
        ) {
            tier++;
        }

        if (tier == 0) return "";

        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tier.toString()))
                : "";
    }

    /**
     * @notice Get the donation (in US$) limit for the given tier
     * @param index the tier of donationTier
     * @return Tier Limit
     */
    function getTierLimit(uint256 index) public view returns (uint256) {
        return donationTier[index];
    }

    /**
     * @notice Update the donation amount (PS: only Treasury can call)
     * @param donator the address of donator
     * @param donation donation amount in US $
     */
    function updateDonation(
        address donator,
        uint256 donation
    ) external onlyRole(MINTER_ROLE) {
        uint256 updatedDonation = donated[donator] + donation;
        if (balanceOf(donator) == 0 && updatedDonation >= donationTier[0]) {
            safeMint(donator);
        }

        emit DonationUpdated(donator, donated[donator], updatedDonation);
        donated[donator] = updatedDonation;
    }

    /**
     * @notice Update the limit for donation Tier
     * @param newDonationTier the array for new donation tiers
     */
    function updateDonationTier(
        uint256[] memory newDonationTier
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        if (newDonationTier.length == 0) {
            revert InvalidDonatinTiers();
        }
        _updateDonationTier(newDonationTier);
    }

    /**
     * @notice Update the base URI
     * @param newBaseURI the new base URI
     */
    function updateBaseURI(
        string memory newBaseURI
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _updateBaseURI(newBaseURI);
    }

    //Internal Functions

    function _updateDonationTier(uint256[] memory newDonationTier) internal {
        donationTier = newDonationTier;
        emit DonationTierUpdated(newDonationTier);
    }

    function _updateBaseURI(string memory newBaseURI) internal {
        baseURI = newBaseURI;
        emit BaseURIUpdated(newBaseURI);
    }

    function safeMint(address to) internal {
        // require(balanceOf(to) == 0, "VDonations::safeMint:ALREADY_MINTED");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        if (!hasRole(MINTER_ROLE, msg.sender)) revert NonTransferable();

        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
