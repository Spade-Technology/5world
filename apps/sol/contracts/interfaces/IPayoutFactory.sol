// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

interface IPayoutFactory {
    function latestPayoutContract() external view returns (address);
}
