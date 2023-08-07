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

async function main() {
  let res;

  const [owner] = await ethers.getSigners();
  const proxy = "0x54357A2CEf849389258a73521969d97567AaA1eA"

  console.log("deploying VDAOImplementation");

  const VDAOImplementation = await ethers.getContractFactory('VDAOImplementation');
  const vDAOImplementation = await VDAOImplementation.deploy();
  await vDAOImplementation.deployed();

  console.log("VDAOImplementation deployed to:", vDAOImplementation.address);

  const VDAOProxy = await ethers.getContractFactory('VDAOProxy');
  const vDAOProxy = await VDAOProxy.attach(proxy);

  console.log("VDAOProxy deployed to:", vDAOProxy.address);

  await vDAOProxy._setImplementation(vDAOImplementation.address);

  await hre.run('verify:verify', {
    address: vDAOImplementation.address,
    constructorArguments: [],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
