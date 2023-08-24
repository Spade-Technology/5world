import { ethers } from 'hardhat';


import ProgressBar from 'progress';
import hre from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract } from 'ethers';

const dev = true;
const hardhatnetwork = hre.network.name === 'hardhat' || hre.network.name === 'localhost'

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function getBlockTime() {
  const block = await ethers.provider.getBlock('latest');
  return block.timestamp;
}

// azeazeazeaze
async function main() {
  let res;

  const [owner] = await ethers.getSigners();

  const timelockAddress = '0x4e49B85709E36bCDdeC8E166eD5E7C2735C5BCe0';

  const RoundImplementation = await ethers.getContractFactory('RoundImplementation');
  const roundImplementation = await RoundImplementation.deploy();
  await roundImplementation.deployed();
  console.log('RoundImplementation deployed to:', roundImplementation.address);


  const RoundFactory = await ethers.getContractFactory('RoundFactory');
  const roundFactory = await RoundFactory.deploy();
  await roundFactory.deployed();
  res = await roundFactory.initialize()
  await res.wait(1);
  
  console.log('RoundFactory deployed to:', roundFactory.address);
  
  await roundFactory.updateRoundContract(roundImplementation.address);
  await roundFactory.transferOwnership(timelockAddress);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
