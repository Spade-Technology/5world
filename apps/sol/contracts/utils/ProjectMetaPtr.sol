// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.9;

struct ProjectMetaPtr {
    // Protocol ID corresponding to a specific protocol
    uint256 protocol;
    /// @notice Pointer to fetch metadata for the specified proposal
    string pointer;
    /// @notice owner address to update project MetaPtr
    address owner;
    /// @notice Wallet address to receive matching amount
    address fundsWallet;
    /// @notice quadratic votes in favour of proposal
    uint256 forVotes;
    /// @notice to store in matching funds is claimed
    bool fundsClaimed;
}
