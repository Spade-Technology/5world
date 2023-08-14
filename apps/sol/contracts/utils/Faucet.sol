// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Faucet {
    uint256 public constant tokenAmount = 4000000 * (10 ** 18);
    uint256 public constant waitTime = 1 hours;

    ERC20 public tokenInstance;

    mapping(address => uint256) lastAccessTime;

    constructor(address _tokenInstance) {
        require(_tokenInstance != address(0));
        tokenInstance = ERC20(_tokenInstance);
    }

    function requestTokens() public {
        require(allowedToWithdraw(msg.sender));
        tokenInstance.transfer(msg.sender, tokenAmount);
        lastAccessTime[msg.sender] = block.timestamp + waitTime;
    }

    function allowedToWithdraw(address _address) public view returns (bool) {
        if (lastAccessTime[_address] == 0) {
            return true;
        } else if (block.timestamp >= lastAccessTime[_address]) {
            return true;
        }
        return false;
    }
}
