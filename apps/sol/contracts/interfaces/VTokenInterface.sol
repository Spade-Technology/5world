// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

interface VTokenInterface {
    function balanceOf(address account) external view returns (uint);
    function getPriorVotes(address account, uint blockNumber) external view returns (uint96);
    function getPriorBalance(address account, uint blockNumber) external view returns (uint96);
    function delegateOnDist(address, address) external;
}