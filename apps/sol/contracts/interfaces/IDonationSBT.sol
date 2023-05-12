// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

interface IDonationSBT {
    function safeMint(address to) external;

    function balanceOf(address owner) external view returns (uint256);

    function updateDonation(address donator, uint256 updatedDonation) external;
}
