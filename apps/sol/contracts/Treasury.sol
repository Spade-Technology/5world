// SPDX-License-Identifier: NONE

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Context.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

import "./interfaces/IDonationSBT.sol";
import "./interfaces/IRoundFactory.sol";
import "./interfaces/IPayoutFactory.sol";

contract Treasury is Context {
    using SafeERC20 for IERC20;

    // --- Storage ---

    /// @notice The address of the V Token
    address public immutable vDAO;

    /// @notice the address of the V DAO timelock contract
    address public guardian;

    /// @notice The address nominated to become the new guardian
    address public pendingGuardian;

    /// @notice The address used for creating new payout contracts
    address public payoutFactory;

    /// @notice The address used for creating new round contracts
    address public roundFactory;

    /// @notice the address for giving out donation badges
    address public donationSBT;

    /// @notice the amount of tokens to be paid out by the treasury
    uint256 public payoutAmount;

    /// @notice A boolean flag that determines whether donations are currently paused or not
    bool public donationPaused = false;

    /// @notice list of supported tokens, PS: only stables and ETH will be supported.
    mapping(address => bool) public supportedTokens;

    /// @notice A mapping that keeps track of which addresses have already claimed a payout
    mapping(address => bool) public payoutClaimed;

    // --- Constants ---

    /// @notice Use Chainlink's AggregatorV3Interface to get the current ETH/USD price feed.
    AggregatorV3Interface public constant priceFeedETH_USD =
        AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
    // ETH: 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419 // Goerli - 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e

    // --- Modofiers ---

    /// @notice modifier that only allows the current guardian to perform the function
    modifier onlyGuardian() {
        if (guardian != _msgSender()) revert NotGuardian();
        _;
    }

    /// @notice modifier that checks whether donations are paused or not
    modifier isNotPaused() {
        if (donationPaused) revert DonationPaused();
        _;
    }

    // --- Events ---

    /// @notice Emitted when the guardian address is updated
    event GuardianUpdated(
        address indexed guardian,
        address indexed newGuardian
    );

    /// @notice Emitted when the pendingGuardian address is updated
    event PendingGuardianUpdated(
        address indexed guardian,
        address indexed newGuardian
    );

    /// @notice Emitted when the payoutFactory address is updated
    event PayoutFactoryUpdated(
        address indexed payoutFactory,
        address indexed newPayoutFactory
    );

    // @notice Emitted when the roundFactory address is updated
    event RoundFactoryUpdated(
        address indexed roundFactory,
        address indexed newRoundFactory
    );

    /// @notice Emitted when the donationSBT address is updated
    event DonationSBTUpdated(
        address indexed donationSBT,
        address indexed newDonationSBT
    );

    /// @notice Emitted when the payout amount is updated
    event PayoutAmountUpdated(
        uint256 indexed payoutAmount,
        uint256 indexed newPayoutAmount
    );

    /// @notice Emitted when a donation is received
    event DonationReceived(
        address indexed donator,
        address indexed token,
        uint256 amount,
        uint256 amountUSD
    );

    /// @notice Emitted when the support for a token is updated
    event SupportedTokenUpdated(address indexed token, bool indexed support);

    /// @notice Emitted when a payout is claimed
    event PayoutClaimed(address indexed payoutContract, uint256 payoutAmount);

    /// @notice Emitted when a round is funded
    event RoundFunded(
        address indexed roundContract,
        address indexed token,
        uint256 amount
    );

    /// @notice Emitted when a transaction is executed
    event ExecuteTransaction(address indexed target, uint256 value, bytes data);

    // --- Errors ---

    /// @notice thrown when the caller is not the pendingGuardian
    error NotpendingAdmin();

    /// @notice thrown when the caller is not the current guardian.
    error NotGuardian();

    /// @notice thrown when donations are paused.
    error DonationPaused();

    /// @notice thrown when an address argument is zero.
    error ZeroAddress();

    /// @notice thrown when an input parameter is invalid.
    error InvalidInput();

    /// @notice thrown when an attempt to send ETH fails.
    error SendETHFailed();

    /// @notice thrown when a function is called by an invalid caller.
    error InvalidCaller();

    /// @notice thrown when an attempt to claim a payout has already been
    error AlreadyClaimed();

    /// @notice thrown when a token is not supported for donation.
    error TokenNotSupported();

    /// @notice thrown when the msg.value provided is insufficient.
    error InsufficientValueProvided();

    /// @notice thrown when a transaction execution is reverted.
    error ExecutionReverted();

    // --- Constructor ---

    /// @notice Constructor function to initialize the contract
    /// @param vDAO_ address of the V Token
    /// @param guardian_ address of the initial guardian (timelock)
    /// @param payoutAmount_ initial payout amount to be given out by treasury
    constructor(
        address vDAO_,
        address guardian_,
        uint256 payoutAmount_,
        address roundFactory_
    ) {
        vDAO = vDAO_;
        guardian = guardian_;
        payoutAmount = payoutAmount_;
        roundFactory = roundFactory_;

        // updating some base supported tokens
        address[] memory tokens = new address[](4);
        tokens[0] = address(0); // ETH
        tokens[1] = address(0x6B175474E89094C44Da98b954EedeAC495271d0F); // DAI Goerli - 0x60DF13046ef7Ac1F9f812B8aD35A0dc73459e960
        tokens[2] = address(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48); // USDC Goerli - 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
        tokens[3] = address(0xdAC17F958D2ee523a2206206994597C13D831ec7); // USDT Goerli - 0xdAC17F958D2ee523a2206206994597C13D831ec7

        _updateSupportedToken(tokens, true);

        emit GuardianUpdated(address(0), guardian_);
        emit PayoutAmountUpdated(0, payoutAmount_);
    }

    // --- Core methods ---

    /// @notice Set new payout factory address (only by guardian)
    /// @param newPayoutFactory_ New payout factory address to be set
    function setPayoutFactory(address newPayoutFactory_) external onlyGuardian {
        if (newPayoutFactory_ == address(0)) revert ZeroAddress();

        emit PayoutFactoryUpdated(payoutFactory, newPayoutFactory_);
        payoutFactory = newPayoutFactory_;
    }

    /// @notice Update the RoundFactory contract address (only by guardian)
    /// @param newRoundFactory_ The address of the new RoundFactory contract
    function setRoundFactory(address newRoundFactory_) external onlyGuardian {
        if (newRoundFactory_ == address(0)) revert ZeroAddress();

        emit RoundFactoryUpdated(roundFactory, newRoundFactory_);
        roundFactory = newRoundFactory_;
    }

    // @notice Update the DonationSBT contract address (only by guardian)
    /// @param newDonationSBT_ The address of the new DonationSBT contract
    function setDonationSBT(address newDonationSBT_) external onlyGuardian {
        if (newDonationSBT_ == address(0)) revert ZeroAddress();

        emit DonationSBTUpdated(donationSBT, newDonationSBT_);
        donationSBT = newDonationSBT_;
    }

    /// @notice Update the amount of vDAO token that will be paid out to by treasury
    /// @param newPayoutAmount_ the new payout amount in V tokens
    function updatePayoutAmount(
        uint256 newPayoutAmount_
    ) external onlyGuardian {
        if (newPayoutAmount_ > IERC20(vDAO).totalSupply() / 1000)
            revert InvalidInput();

        emit PayoutAmountUpdated(payoutAmount, newPayoutAmount_);
        payoutAmount = newPayoutAmount_;
    }

    /// @notice Fund the latest grant round with the specified token and amount
    /// @param token_ the token address to fund with, use address(0) for ETH
    /// @param amount_ the amount of token to fund with
    function fundGrantRound(
        address token_,
        uint256 amount_
    ) external onlyGuardian {
        address roundContract = IRoundFactory(roundFactory)
            .latestRoundContract();
        if (token_ == address(0)) {
            // ETH
            (bool success, ) = roundContract.call{value: amount_}("");
            if (!success) revert SendETHFailed();
        } else {
            IERC20(token_).safeTransfer(roundContract, amount_);
        }

        emit RoundFunded(roundContract, token_, amount_);
    }

    /// @notice Updates the supported token list (only ETH and stables should be supported)
    /// @param tokens_ an array of token addresses to update support for
    /// @param support_ a boolean indicating whether to support or remove support for the tokens
    function updateSupportedToken(
        address[] memory tokens_,
        bool support_
    ) public onlyGuardian {
        _updateSupportedToken(tokens_, support_);
    }

    /// @notice Claims the payout amount for the latest payout contract
    function claimPayout() external {
        address payoutContract = IPayoutFactory(payoutFactory)
            .latestPayoutContract();
        if (_msgSender() != payoutContract) revert InvalidCaller();

        if (payoutClaimed[payoutContract]) revert AlreadyClaimed();

        payoutClaimed[payoutContract] = true;
        IERC20(vDAO).transfer(payoutContract, payoutAmount);

        emit PayoutClaimed(payoutContract, payoutAmount);
    }

    /// @notice Pauses accepting donations
    function pauseDonation() external onlyGuardian {
        donationPaused = true;
    }

    /// @notice Resumes accepting donations
    function unPauseDonation() external onlyGuardian {
        donationPaused = false;
    }

    /// @notice Accepts donation in the specified token and logs the donation event
    /// @param token_ the token address of the donated token, use address(0) for ETH
    /// @param amount_ the amount of token to donate
    function donate(
        address token_,
        uint256 amount_
    ) external payable isNotPaused {
        if (!supportedTokens[token_]) revert TokenNotSupported();

        // checking the condition for ETH
        if (token_ == address(0)) {
            if (msg.value < amount_) revert InsufficientValueProvided();
        } else {
            IERC20(token_).safeTransferFrom(
                _msgSender(),
                address(this),
                amount_
            );
        }

        // calculating $(US dollar) equivalent
        uint256 amountUSD = _getUSDAmount(token_, amount_);

        // mint SBT if donation amount exceeds thershold
        if (donationSBT != address(0)) {
            IDonationSBT(donationSBT).updateDonation(msg.sender, amountUSD);
        }

        emit DonationReceived(_msgSender(), token_, amount_, amountUSD);
    }

    /// @notice Executes a transaction on behalf of the contract
    /// @param target_ The address of the contract to call
    /// @param value_ The amount of ETH to send with the transaction
    /// @param data_ The data to send with the transaction
    /// @return The return data of the transaction
    function executeTransaction(
        address target_,
        uint256 value_,
        bytes memory data_
    ) external onlyGuardian returns (bytes memory) {
        // solium-disable-next-line security/no-call-value
        (bool success, bytes memory returnData) = target_.call{value: value_}(
            data_
        );
        if (!success) revert ExecutionReverted();

        emit ExecuteTransaction(target_, value_, data_);

        return returnData;
    }

    /// @notice Sets the new pending guardian, which can then accept the guardian role
    /// @param newPendingGuardian_ the address of the new pending guardian
    function setPendingguardian(
        address newPendingGuardian_
    ) external onlyGuardian {
        emit PendingGuardianUpdated(pendingGuardian, newPendingGuardian_);

        pendingGuardian = newPendingGuardian_;
    }

    /// @notice Accepts the guardian role, setting the current pending guardian as the new guardian
    function acceptGuardian() external {
        if (_msgSender() != pendingGuardian) revert NotpendingAdmin();

        emit GuardianUpdated(guardian, pendingGuardian);

        guardian = pendingGuardian;
        pendingGuardian = address(0);
    }

    // --- Internal Functions ---

    function _updateSupportedToken(
        address[] memory tokens_,
        bool support_
    ) internal {
        for (uint256 i = 0; i < tokens_.length; i++) {
            supportedTokens[tokens_[i]] = support_;
            emit SupportedTokenUpdated(tokens_[i], support_);
        }
    }

    function _getUSDAmount(
        address token_,
        uint256 amount_
    ) internal view returns (uint256 _amountUSD) {
        if (token_ == address(0)) {
            // ETH
            (, int price, , , ) = priceFeedETH_USD.latestRoundData();

            uint priceFeedDecimal = priceFeedETH_USD.decimals();
            _amountUSD = (uint256(price) * amount_) / (10 ** priceFeedDecimal);
        } else {
            // stables
            uint decimals = IERC20Metadata(token_).decimals();
            _amountUSD = amount_ / (10 ** decimals);
        }
    }
}
