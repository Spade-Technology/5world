// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.9;

struct MetaPtr {
    // Protocol ID corresponding to a specific protocol
    uint256 protocol;
    // Pointer to fetch metadata for the specified protocol
    string pointer;
}
