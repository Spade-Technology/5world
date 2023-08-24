// SPDX-License-Identifier: NONE
pragma solidity ^0.8.9;

import "../utils/MetaPtr.sol";
import "../utils/ProjectMetaPtr.sol";
import "../interfaces/ITimelock.sol";
import "../interfaces/IDonationSBT.sol";
import "../interfaces/VTokenInterface.sol";

contract RoundEvents {
    // --- Events ---

    /// @notice Emitted when round time is updated
    event RoundTimeUpdated(
        uint256 newApplicationStartBlock,
        uint256 newApplicationEndBlock,
        uint256 newRoundStartBlock,
        uint256 newRoundEndBlock
    );

    /// @notice Emitted when a matching amount is updated
    event MatchingAmountUpdated(
        uint256 oldMatchingAmount,
        uint256 newMatchingAmount
    );

    /// @notice Emiited when the blacklist state of a proposal is updated
    event BlacklistUpdated(uint256 indexed proposalId, bool indexed blacklist);

    /// @notice Emitted when the  initMetaPtr is updated
    event MetaPtrUpdated(
        MetaPtr newRoundMetaPtr,
        MetaPtr newApplicationMetaPtr
    );

    /// @notice Emitted when a project has applied to the round
    event NewProjectApplication(
        uint256 indexed proposalId,
        MetaPtr applicationMetaPtr,
        address indexed owner,
        address indexed wallet
    );

    /// @notice Emitted when projects metaPtr is updated
    event ProjectsMetaPtrUpdated(
        uint256 indexed proposalId,
        MetaPtr newProjectMetaPtr,
        address newFundsWallet
    );

    /// @notice Emitted when a new vote is sent
    event VoteCast(
        uint256 indexed proposalId,
        uint256 votes,
        address indexed voter
    );

    /// @notice Emitted when the allocated fund is claimed.
    event FundsClaimed(uint256 indexed proposalId, uint256 matchedAmount);

    // --- Errors ---

    /// @notice thrown when the round state is invalid
    error InvalidState();

    /// @notice thrown when the funds are already claimed
    error AlreadyClaimed();

    /// @notice thrown when the project blacklist state is alreadt set
    error BlacklistAlreadySet();

    /// @notice thrown when the caller is not Project owner
    error NotProjectOwner();

    /// @notice thrown when the user has already voted
    error AlreadyVoted();

    /// @notice thrown when if id is more than proposal count or proposal is blacklisted
    error InvalidProposalId();

    /// @notice thrown when the vote casted is more than voting power
    error InsufficientVotingPower();

    /// @notice thrown when roundEndBlock has passed
    error RoundEnded();

    /// @notice thrown when applicationEndBlock has passed
    error ApplicationsEnded();

    /// @notice thrown when can't withdraw input token.
    error InvalidToken();
}

contract RoundProxyStorage {
    /// @notice Administrator for this contract
    address public admin;

    /// @notice Pending administrator for this contract
    address public pendingAdmin;

    /// @notice Active brains of Governor
    address public implementation;
}

/**
 * @title Storage for Governor Bravo Delegate
 * @notice For future upgrades, do not change GovernorBravoDelegateStorageV1. Create a new
 * contract which implements GovernorBravoDelegateStorageV1 and following the naming convention
 * GovernorBravoDelegateStorageVX.
 */
contract RoundImplementationStorageV1 is RoundProxyStorage {
    /// @notice block number from when round can accept applications
    uint256 public applicationsStartBlock;

    /// @notice block number from when round stops accepting applications
    uint256 public applicationsEndBlock;

    /// @notice block number of the start of the round
    uint256 public roundStartBlock;

    /// @notice block number of the end of the round
    uint256 public roundEndBlock;

    /// @notice Dao Token used to vote for proposal using quadratic funding
    VTokenInterface public vDAO;

    /// @notice SBT used to vote for proposal using quadratic funding
    address public donationSBT;

    /// @notice Address of the ERC20 token for distributing matching pool contributions; ETH -> address(0)
    address public token;

    /// @notice Total matching amount for this round
    uint256 public matchingAmount;

    /// @notice MetaPtr to the round metadata
    MetaPtr public roundMetaPtr;

    /// @notice MetaPtr to the application form schema
    MetaPtr public applicationMetaPtr;

    /// @notice The total number of proposals
    uint public proposalCount;

    /// @notice Total sum of quadratic votes
    uint public totalQuadraticVotes;

    /// @notice Propsals for all the applications
    mapping(uint256 => ProjectMetaPtr) public proposals;

    /// @notice blaklist state for each proposals
    mapping(uint256 => bool) public isBlacklisted;

    /// @notice Receipts of ballots for the entire set of voters
    mapping(address => Receipt) public receipts;

    struct InitRoundTime {
        uint256 applicationsStartBlock; // block number from when round can accept applications
        uint256 applicationsEndBlock; // block number from when round stops accepting applications
        uint256 roundStartBlock; // block number of the start of the round
        uint256 roundEndBlock; // block number of the end of the round
    }

    struct InitRoles {
        address[] roundOperators; // Addresses to be granted ROUND_OPERATOR_ROLE
    }

    struct InitMetaPtr {
        MetaPtr roundMetaPtr; // MetaPtr to the round metadata
        MetaPtr applicationMetaPtr; // MetaPtr to the application form schema
    }

    /// @notice Ballot receipt record for a voter
    struct Receipt {
        /// @notice Whether or not a vote has been cast
        bool hasVoted;
        /// @notice The array of proposals voter voted for
        uint8[] proposals;
        /// @notice The array of number of votes, which were cast
        uint96[] votes;
    }

    // struct ProjectMetaPtr {
    //     // Protocol ID corresponding to a specific protocol
    //     uint256 protocol;
    //     /// @notice Pointer to fetch metadata for the specified proposal
    //     string pointer;
    //     /// @notice owner address to update project MetaPtr
    //     address owner;
    //     /// @notice Wallet address to receive matching amount
    //     address fundsWallet;
    //     /// @notice quadratic votes in favour of proposal
    //     uint256 forVotes;
    //     /// @notice to store in matching funds is claimed
    //     bool fundsClaimed;
    // }

    // struct MetaPtr {
    //     // Protocol ID corresponding to a specific protocol
    //     uint256 protocol;
    //     // Pointer to fetch metadata for the specified protocol
    //     string pointer;
    // }

    /// @notice Round states that a round may be in
    enum RoundState {
        Pending,
        ApplicationActive,
        ApplicationReview,
        Active,
        Completed,
        FundsAllocated
        // Canceled,
        // Defeated,
        // Succeeded,
        // Queued,
        // Expired,
        // Executed
    }
}
