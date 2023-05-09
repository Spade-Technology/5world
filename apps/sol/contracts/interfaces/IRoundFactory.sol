// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

interface IRoundFactory {
    function latestRoundContract() external view returns (address);
}
