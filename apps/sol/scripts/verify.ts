import { ethers } from 'hardhat';
import ProgressBar from 'progress';
import hre from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract } from 'ethers';

const dev = true;


 const timelock= '0xDb541aD591E97E4617744bd9209DDeF923BC2bAb';
 const vDao= '0x0B66296fC49bAcdA8A631BE1E1f328276ae5c8F9';
 const vDAOImplementation= '0xD773d647F0D801F099e4Bd943c8C521B552EE25f';
 const vDAOProxy = '0x3E4d30D787F882d2fA0BFC45Ef7b1B617Ef4EDd0';
 const treasury= '0x2e7AEc70881328C3cd39FEe813C2715fF32A907e';
 const donationSBT= '0xd3aAc6cE13b6De565a664D20FE4Ba00b3615b504';
 const roundImplementation= '0x8b4178cE220a83d6da89Bb58d93AB6284bC1f2Fc';
 const roundFactory= '0x0EC6B34B140b2a874716ca3F3f9c98e560003cA2';

// azeazeazeaze
async function main() {
  const [owner] = await ethers.getSigners();

  const progressBar = new ProgressBar('Deploying contracts [:bar] :percent :etas || :status', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: 27,
  });

  // Start Verification process
  progressBar.tick({ status: 'Verifying Timelock' });
  await hre.run('verify:verify', {
    address: timelock,
    constructorArguments: [owner.address, dev ? 0 : 86400],
  });

  progressBar.tick({ status: 'Verifying VDaoToken' });
  await hre.run('verify:verify', {
    address: vDao,
    constructorArguments: [owner.address, timelock],
  });

  progressBar.tick({ status: 'Verifying VDAOImplementation' });
  await hre.run('verify:verify', {
    address: vDAOImplementation,
    constructorArguments: [],
  });

  progressBar.tick({ status: 'Verifying VDAOProxy' });
  await hre.run('verify:verify', {
    address: vDAOProxy,
    constructorArguments: [
      timelock,
      vDao,
      owner.address,
      owner.address,
      vDAOImplementation,
      7200,
      1000,
      '1000000000000000000000',
    ],
  });

  progressBar.tick({ status: 'Verifying Treasury' });
  await hre.run('verify:verify', {
    address: treasury,
    constructorArguments: [vDao, timelock, 0],
  });

  progressBar.tick({ status: 'Verifying VDonations' });
  await hre.run('verify:verify', {
    address: donationSBT,
    constructorArguments: [timelock, treasury, [500, 1000, 2000, 5000], 'api.VDAO/DonationSBT/'],
  });

  progressBar.tick({ status: 'Verifying RoundImplementation' });
  await hre.run('verify:verify', {
    address: roundImplementation,
    constructorArguments: [],
  });

  progressBar.tick({ status: 'Verifying RoundFactory' });
  await hre.run('verify:verify', {
    address: roundFactory,
    constructorArguments: [],
  });  


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
