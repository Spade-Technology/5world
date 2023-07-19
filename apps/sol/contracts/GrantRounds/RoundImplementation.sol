// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

// import "../votingStrategy/IVotingStrategy.sol";
// import "../payoutStrategy/IPayoutStrategy.sol";

// import "./utils/MetaPtr.sol";
// import "./VDAOInterfaces.sol";
// import "./interface/IDonationSBT.sol";
import "./RoundInterfaces.sol";
import "hardhat/console.sol";

/**
 * @notice Contract deployed per Round which would managed by
 * a group of ROUND_OPERATOR via the RoundFactory
 */
contract RoundImplementation is
    RoundEvents,
    RoundImplementationStorageV1,
    AccessControlEnumerable,
    Initializable,
    ReentrancyGuard
{
    // --- Libraries ---
    using Address for address;
    using SafeERC20 for IERC20;
    using Counters for Counters.Counter;

    /// @notice voting credit for each VToken (NFT)
    // uint256 public constant VTOKEN_VOTING_CREDIT = 50_000_000_000; // 50 credits with PRECISION = 9

    // --- Constants ---

    /// @notice voting credit for each donation SBTs
    uint256 public constant SBT_VOTING_CREDIT = 50_000_000_000_000_000_000; // 50 credits (equivalent to 50 VTokens)

    // --- Roles ---

    /// @notice round operator role
    bytes32 public constant ROUND_OPERATOR_ROLE = keccak256("ROUND_OPERATOR");

    // --- Modifier ---

    /// @notice modifier to check if round has not ended.
    modifier roundHasNotEnded() {
        // slither-disable-next-line timestamp
        if (block.number > roundEndBlock) revert RoundEnded();
        _;
    }

    /// @notice modifier to check if application period has not ended.
    modifier applicationHasNotEnded() {
        // slither-disable-next-line timestamp
        if (block.number > applicationsEndBlock) revert ApplicationsEnded();
        _;
    }

    /// @notice MetaPtr to the round metadata
    //   MetaPtr public roundMetaPtr;

    /// @notice MetaPtr to the application form schema
    //   MetaPtr public applicationMetaPtr;

    /// @notice MetaPtr to the projects
    //   MetaPtr public projectsMetaPtr;

    // --- Core methods ---

    /**
     * @notice Instantiates a new round
     * @param encodedParameters Encoded parameters for program creation
     * @dev encodedParameters
     *  - _applicationsStartBlock Unix Blockstamp from when round can accept applications
     *  - _applicationsEndBlock Unix Blockstamp from when round stops accepting applications
     *  - _roundStartBlock Unix Blockstamp of the start of the round
     *  - _roundEndBlock Unix Blockstamp of the end of the round
     *  - _token Address of the ERC20 token for accepting matching pool contributions
     *  - _roundMetaPtr MetaPtr to the round metadata
     *  - _applicationMetaPtr MetaPtr to the application form schema
     *  - _adminRoles Addresses to be granted DEFAULT_ADMIN_ROLE
     *  - _roundOperators Addresses to be granted ROUND_OPERATOR_ROLE
     */
    function initialize(
        bytes calldata encodedParameters,
        address[] calldata adminRoles
    ) external initializer {
        // Decode _encodedParameters
        (
            InitRoundTime memory _initRoundTime,
            address _vDAO,
            address _donationSBT,
            address _token,
            uint256 _matchingAmount,
            InitMetaPtr memory _initMetaPtr,
            InitRoles memory _initRoles
        ) = abi.decode(
                encodedParameters,
                (
                    (InitRoundTime),
                    address,
                    address,
                    address,
                    uint256,
                    (InitMetaPtr),
                    (InitRoles)
                )
            );

        // slither-disable-next-line timestamp
        require(
            _initRoundTime.applicationsStartBlock >= block.number,
            "initialize: applications start block has already passed"
        );
        require(
            _initRoundTime.applicationsEndBlock >
                _initRoundTime.applicationsStartBlock,
            "initialize: application end block should be after application start block"
        );

        require(
            _initRoundTime.roundStartBlock >=
                _initRoundTime.applicationsEndBlock + 50400, // 1 week Application review period (1 block = 12 sec)
            "initialize: application end block should be 1 week before round start block"
        );
        require(
            _initRoundTime.roundEndBlock > _initRoundTime.roundStartBlock,
            "initialize: end block should be after start block"
        );

        applicationsStartBlock = _initRoundTime.applicationsStartBlock;
        applicationsEndBlock = _initRoundTime.applicationsEndBlock;
        roundStartBlock = _initRoundTime.roundStartBlock;
        roundEndBlock = _initRoundTime.roundEndBlock;
        vDAO = VTokenInterface(_vDAO);
        donationSBT = _donationSBT;
        token = _token;
        matchingAmount = _matchingAmount;

        roundMetaPtr = _initMetaPtr.roundMetaPtr;
        applicationMetaPtr = _initMetaPtr.applicationMetaPtr;

        // Emit events for indexing
        emit MetaPtrUpdated(
            _initMetaPtr.roundMetaPtr,
            _initMetaPtr.applicationMetaPtr
        );
        emit RoundTimeUpdated(
            _initRoundTime.applicationsStartBlock,
            _initRoundTime.applicationsEndBlock,
            _initRoundTime.roundStartBlock,
            _initRoundTime.roundEndBlock
        );

        // Assigning default admin role
        for (uint256 i = 0; i < _initRoles.adminRoles.length; ++i) {
            _grantRole(DEFAULT_ADMIN_ROLE, _initRoles.adminRoles[i]);
        }

        // Assigning round operators
        for (uint256 i = 0; i < _initRoles.roundOperators.length; ++i) {
            _grantRole(ROUND_OPERATOR_ROLE, _initRoles.roundOperators[i]);
        }
    }

    function getTotalVotes(address account_) public view returns (uint) {
        uint256 vDAOVotes;
        try vDAO.getPriorBalance(account_, roundStartBlock) returns (
            uint96 votes
        ) {
            vDAOVotes = uint256(votes);
        } catch {
            vDAOVotes = 0;
        }
        uint256 sbtVotes = donationSBT != address(0)
            ? IDonationSBT(donationSBT).balanceOf(account_) * SBT_VOTING_CREDIT
            : 0;

        uint256 totalVotes = vDAOVotes + sbtVotes;

        return totalVotes;
    }

    // @notice Update roundMetaPtr, applicationMetaPtr (only by ROUND_OPERATOR_ROLE)
    /// @param newRoundMetaPtr_ new roundMetaPtr
    /// @param newApplicationMetaPtr_ new applicationMetaPtr
    function updateMetaPtr(
        MetaPtr memory newRoundMetaPtr_,
        MetaPtr memory newApplicationMetaPtr_
    ) external applicationHasNotEnded onlyRole(ROUND_OPERATOR_ROLE) {
        roundMetaPtr = newRoundMetaPtr_;
        applicationMetaPtr = newApplicationMetaPtr_;

        emit MetaPtrUpdated(newRoundMetaPtr_, newApplicationMetaPtr_);
    }

    /// @notice Update initRoundTime (only by ROUND_OPERATOR_ROLE)
    /// @param newApplicationsStartBlock_ new applicationsStartBlock
    /// @param newApplicationsEndBlock_ new applicationsEndBlock
    /// @param newRoundStartBlock_ new roundStartBlock
    /// @param newRoundEndBlock_ new roundEndBlock
    function updateRoundTime(
        uint256 newApplicationsStartBlock_,
        uint256 newApplicationsEndBlock_,
        uint256 newRoundStartBlock_,
        uint256 newRoundEndBlock_
    ) external roundHasNotEnded onlyRole(ROUND_OPERATOR_ROLE) {
        // slither-disable-next-line timestamp
        require(
            newApplicationsStartBlock_ >= block.number,
            "updateRoundTime: applications start block has already passed"
        );
        require(
            newApplicationsEndBlock_ > newApplicationsStartBlock_,
            "updateRoundTime: application end block should be after application start block"
        );

        require(
            newRoundStartBlock_ >= newApplicationsEndBlock_ + 50400, // 1 week Application review period (1 block = 12 sec)
            "updateRoundTime: application end block should be 1 week before round start block"
        );
        require(
            newRoundEndBlock_ > newRoundStartBlock_,
            "updateRoundTime: end block should be after start block"
        );

        emit RoundTimeUpdated(
            newApplicationsStartBlock_,
            newApplicationsEndBlock_,
            newRoundStartBlock_,
            newRoundEndBlock_
        );

        applicationsStartBlock = newApplicationsStartBlock_;
        applicationsEndBlock = newApplicationsEndBlock_;
        roundStartBlock = newRoundStartBlock_;
        roundEndBlock = newRoundEndBlock_;
    }

    /// @notice Update blacklist state of an Application (only by ROUND_OPERATOR_ROLE)
    /// @param proposalId_ application id
    /// @param blacklist_ new blacklist state
    function blacklistProposal(
        uint256 proposalId_,
        bool blacklist_
    ) external onlyRole(ROUND_OPERATOR_ROLE) {
        if (state() != RoundState.ApplicationReview) revert InvalidState();

        if (isBlacklisted[proposalId_] == blacklist_)
            revert BlacklistAlreadySet();

        isBlacklisted[proposalId_] = blacklist_;

        emit BlacklistUpdated(proposalId_, blacklist_);
    }

    /// @notice Update projectsMetaPtr (only by ROUND_OPERATOR_ROLE)
    /// @param proposalId_ proposal id of project
    /// @param newProjectsMetaPtr_ new Project MetaPtr
    /// @param newFundsWallet_ new wallet to claim funds to
    function updateProjectsMetaPtr(
        uint256 proposalId_,
        MetaPtr memory newProjectsMetaPtr_,
        address newFundsWallet_
    ) external applicationHasNotEnded {
        ProjectMetaPtr storage project = proposals[proposalId_];
        if (project.owner != msg.sender) revert NotProjectOwner();

        project.protocol = newProjectsMetaPtr_.protocol;
        project.pointer = newProjectsMetaPtr_.pointer;
        project.fundsWallet = newFundsWallet_;

        emit ProjectsMetaPtrUpdated(
            proposalId_,
            newProjectsMetaPtr_,
            newFundsWallet_
        );
    }

    /**
     * @notice Gets the state of a round
     * @return Round state
     */
    //  TODO: upadte quorum votes
    function state() public view returns (RoundState) {
        // slither-disable-next-line timestamp
        if (block.number <= applicationsStartBlock) {
            return RoundState.Pending;
        } else if (block.number <= applicationsEndBlock) {
            return RoundState.ApplicationActive;
        } else if (block.number <= roundStartBlock) {
            return RoundState.ApplicationReview;
        } else if (block.number <= roundEndBlock) {
            return RoundState.Active;
        } else if (totalQuadraticVotes != 0) {
            return RoundState.FundsAllocated;
        } else {
            return RoundState.Completed;
        }
    }

    /// @notice Submit a project application
    /// @param newApplicationMetaPtr_ appliction Ptr
    /// @param wallet_ address to receive matching amount
    function applyToRound(
        MetaPtr calldata newApplicationMetaPtr_,
        address wallet_
    ) external {
        if (state() != RoundState.ApplicationActive) revert InvalidState();

        proposalCount++;
        proposals[proposalCount] = ProjectMetaPtr(
            newApplicationMetaPtr_.protocol,
            newApplicationMetaPtr_.pointer,
            msg.sender,
            wallet_,
            0,
            false
        );

        emit NewProjectApplication(
            proposalCount,
            newApplicationMetaPtr_,
            msg.sender,
            wallet_
        );
    }

    /// @notice Invoked by voter to cast votes
    /// @param encodedVotes_ encoded vote
    function vote(bytes[] memory encodedVotes_) external payable {
        if (state() != RoundState.Active) revert InvalidState();

        Receipt memory receipt = receipts[msg.sender];
        if (receipt.hasVoted == true) revert AlreadyVoted();

        // Total voting power as of applicationsStartBlock Block
        uint256 totalVotes = getTotalVotes(msg.sender);

        /// @dev iterate over multiple votes and apply quadratic funding

        uint256 length = encodedVotes_.length;
        uint8[] memory votedProposals = new uint8[](length);
        uint96[] memory votes = new uint96[](length);

        for (uint256 i = 0; i < length; i++) {
            (uint256 _proposalID, uint256 _amount) = abi.decode(
                encodedVotes_[i],
                (uint256, uint256)
            );

            // console.log("proposal", _proposalID, _isValid(_proposalID));

            if (!_isValid(_proposalID)) revert InvalidProposalId();

            if (totalVotes < _amount) revert InsufficientVotingPower();

            unchecked {
                totalVotes = totalVotes - _amount;
            }

            ProjectMetaPtr storage proposal = proposals[_proposalID];
            uint256 quadraticVotes = Math.sqrt(_amount);

            proposal.forVotes = proposal.forVotes + quadraticVotes;

            votedProposals[i] = uint8(_proposalID);
            votes[i] = uint96(_amount);

            /// @dev emit event for transfer
            emit VoteCast(_proposalID, _amount, msg.sender);
        }
        receipt.hasVoted = true;
        receipt.proposals = votedProposals;
        receipt.votes = votes;

        receipts[msg.sender] = receipt;
    }

    /// @notice Invoked by anyone to distribute the matched amount
    function claim(uint256 propsalId_) external nonReentrant {
        // slither-disable-next-line timestamp
        // require(block.number > roundEndBlock,"distribution: round is still active");
        if (state() != RoundState.FundsAllocated) {
            allocateFunds();
        }

        ProjectMetaPtr memory proposal = proposals[propsalId_];
        if (proposal.fundsClaimed) revert AlreadyClaimed();

        uint256 votes = proposal.forVotes ** 2;
        uint256 matchedAmount = (matchingAmount * votes) / totalQuadraticVotes;

        if (token == address(0)) {
            /// @dev native token transfer to grant address
            // slither-disable-next-line reentrancy-events
            AddressUpgradeable.sendValue(
                payable(proposal.fundsWallet),
                matchedAmount
            );
        } else {
            /// @dev erc20 transfer to grant address
            // slither-disable-next-line arbitrary-send-erc20,reentrancy-events,
            SafeERC20Upgradeable.safeTransfer(
                IERC20Upgradeable(token),
                proposal.fundsWallet,
                matchedAmount
            );
        }

        emit FundsClaimed(propsalId_, matchedAmount);
    }

    /// @notice Invoked by anyone to distribute the matched amount
    function distribute() external /*nonReentrant*/ {
        if (state() != RoundState.FundsAllocated) {
            allocateFunds();
        }

        for (uint256 i = 1; i <= proposalCount; i++) {
            try this.claim(i) {} catch {}
        }
    }

    /// @notice Calculates the total quadratic votes for the current round and updates the state
    function allocateFunds() public {
        if (state() != RoundState.Completed) {
            revert InvalidState();
        }

        totalQuadraticVotes = _getTotalQuadraticVotes();
    }

    /// @notice Withdraws unsupported tokens from the contract and sends them to the specified recipient
    /// @param token_ the address of the token to withdraw
    /// @param recepient_ the address to send the withdrawn tokens to
    function withdrawUnsupportedTokens(
        address token_,
        address recepient_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (token_ == token) revert InvalidToken();

        IERC20(token_).safeTransfer(
            recepient_,
            IERC20(token_).balanceOf(address(this))
        );
    }

    /// @notice Update matchingAmount (only by ROUND_OPERATOR_ROLE)
    /// @param newMatchingAmount_ new matchingAmount
    function updateMatchingAmount(
        uint256 newMatchingAmount_
    ) external applicationHasNotEnded onlyRole(DEFAULT_ADMIN_ROLE) {
        emit MatchingAmountUpdated(matchingAmount, newMatchingAmount_);

        matchingAmount = newMatchingAmount_;
    }

    function _getTotalQuadraticVotes()
        internal
        view
        returns (uint256 totalQuadraticVotes)
    {
        totalQuadraticVotes = 0;

        for (uint256 i = 1; i <= proposalCount; i++) {
            ProjectMetaPtr memory proposal = proposals[i];
            totalQuadraticVotes =
                totalQuadraticVotes +
                (proposal.forVotes ** 2);
        }

        return totalQuadraticVotes;
    }

    function _isValid(uint256 proposalId) internal view returns (bool) {
        if (proposalId <= proposalCount) return !isBlacklisted[proposalId];

        return false;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}
}
