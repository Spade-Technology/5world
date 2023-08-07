import { ethers } from 'hardhat';



import hre from 'hardhat';

const dev = true;
const hardhatnetwork = hre.network.name === 'hardhat' || hre.network.name === 'localhost'


// azeazeazeaze
async function main() {
  let res;

  const [owner] = await ethers.getSigners();

  const token = await ethers.getContractAt('VDaoToken', '0x50a899d3eE5d8c6688ED867b141EAD298bf6c228');


  const Faucet = await ethers.getContractFactory('Faucet');
  const faucet = await Faucet.deploy(token.address);
  await faucet.deployed();

  console.log("Faucet deployed to:", faucet.address);

  await hre.run('verify:verify', {
    address: faucet.address,
    constructorArguments: [token.address],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
