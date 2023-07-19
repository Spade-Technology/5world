import { ethers } from 'hardhat';
import ProgressBar from 'progress';
import hre from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract } from 'ethers';

const dev = true;

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
  const [owner] = await ethers.getSigners();

  const progressBar = new ProgressBar('Deploying contracts [:bar] :percent :etas || :status', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: 27,
  });

  progressBar.tick({ status: 'Deploying Timelock' });
  const Timelock = await ethers.getContractFactory('Timelock');
  const timelock = await Timelock.deploy(owner.address, dev ? 0 : 86400);
  await timelock.deployed();
  progressBar.tick();
  // const timelock: Contract | SignerWithAddress = owner;

  progressBar.tick({ status: 'Deploying VDaoToken' });
  const VDao = await ethers.getContractFactory('VDaoToken');
  const vDao = await VDao.deploy(owner.address, timelock.address);
  await vDao.deployed();
  progressBar.tick();

  progressBar.tick({ status: 'Deploying VDAOImplementation' });
  const VDAOImplementation = await ethers.getContractFactory('VDAOImplementation');
  const vDAOImplementation = await VDAOImplementation.deploy();
  await vDAOImplementation.deployed();
  progressBar.tick();

  progressBar.tick({ status: 'Deploying VDAOProxy' });
  const VDAOProxy = await ethers.getContractFactory('VDAOProxy');
  const vDAOProxy = await VDAOProxy.deploy(
    timelock.address,
    vDao.address,
    owner.address,
    owner.address,
    vDAOImplementation.address,
    7200,
    1,
    '1000000000000000000000'
  );
  await vDAOProxy.deployed();


  // execute transaction
  if (timelock instanceof Contract) {
    // setup parameter
    const target = vDao.address;
    const value = 0;
    const signature = "enableTrading()"; // function signature
    const data = ethers.utils.arrayify(0); // No arguments to pass, so data is 0
    const eta = Math.floor(await getBlockTime() + 20); // set ETA to now


    await timelock.queueTransaction(target, value, signature, data, eta);
    
    // push evm forward by 10 seconds if hardhat network is hardhat or localhost
    progressBar.tick({ status: 'Waiting for timelock tx to be accepted.' });
    if (hre.network.name === 'hardhat' || hre.network.name === 'localhost') await hre.network.provider.send('evm_increaseTime', [1]);
    else await sleep(25000);

    // execute transaction
    await timelock.executeTransaction(target, value, signature, data, eta);

    await timelock.setPendingAdmin(vDAOProxy.address);
  }

  const proxiedVDao = await VDAOImplementation.attach(vDAOProxy.address);
  if (timelock instanceof Contract) await proxiedVDao._initiate();
  progressBar.tick();

  progressBar.tick({ status: 'Deploying Treasury' });
  const Treasury = await ethers.getContractFactory('Treasury');
  const treasury = await Treasury.deploy(vDao.address, timelock.address, 0);
  await treasury.deployed();
  progressBar.tick();

  progressBar.tick({ status: 'Deploying VDonations' });
  const DonationSBT = await ethers.getContractFactory('VDonations');
  const donationSBT = await DonationSBT.deploy(timelock.address, treasury.address, [500, 1000, 2000, 5000], 'api.VDAO/DonationSBT/');
  await donationSBT.deployed();
  progressBar.tick();

  progressBar.tick({ status: 'Deploying RoundImplementation' });
  const RoundImplementation = await ethers.getContractFactory('RoundImplementation');
  const roundImplementation = await RoundImplementation.deploy();
  await roundImplementation.deployed();
  progressBar.tick();

  progressBar.tick({ status: 'Deploying RoundFactory' });
  const RoundFactory = await ethers.getContractFactory('RoundFactory');
  const roundFactory = await RoundFactory.deploy();
  await roundFactory.deployed();
  progressBar.tick();

  progressBar.tick({ status: 'Updating RoundFactory' });
  await roundFactory.initialize();
  await roundFactory.updateRoundContract(roundImplementation.address);
  progressBar.tick();

 

  const contracts = {
    timelock: timelock.address,
    vDao: vDao.address,
    vDAOImplementation: vDAOImplementation.address,
    proxiedVDao: proxiedVDao.address,
    treasury: treasury.address,
    donationSBT: donationSBT.address,
    roundImplementation: roundImplementation.address,
    roundFactory: roundFactory.address,
  };

  console.log("-- --- --")
  console.log(`-- vdao has successfully deployed on ${hre.network.name} --`);
  console.log('you can add the following to your contracts.ts file:');
  console.log(`${hre.network.name}: ${JSON.stringify(contracts, null, 2)};`);
  console.log("-- --- --");
  console.log('Waiting 5 seconds for etherscan to index contracts');
  console.log("-- --- --");

  await sleep(5000);

  // Start Verification process
  progressBar.tick({ status: 'Verifying Timelock' });
  await hre.run('verify:verify', {
    address: timelock.address,
    constructorArguments: [owner.address, dev ? 0 : 86400],
  });

  progressBar.tick({ status: 'Verifying VDaoToken' });
  await hre.run('verify:verify', {
    address: vDao.address,
    constructorArguments: [owner.address, timelock.address],
  });

  progressBar.tick({ status: 'Verifying VDAOImplementation' });
  await hre.run('verify:verify', {
    address: vDAOImplementation.address,
    constructorArguments: [],
  });

  progressBar.tick({ status: 'Verifying VDAOProxy' });
  await hre.run('verify:verify', {
    address: vDAOProxy.address,
    constructorArguments: [
      timelock.address,
      vDao.address,
      owner.address,
      owner.address,
      vDAOImplementation.address,
      7200,
      1000,
      '1000000000000000000000',
    ],
  });

  progressBar.tick({ status: 'Verifying Treasury' });
  await hre.run('verify:verify', {
    address: treasury.address,
    constructorArguments: [vDao.address, timelock.address, 0],
  });

  progressBar.tick({ status: 'Verifying VDonations' });
  await hre.run('verify:verify', {
    address: donationSBT.address,
    constructorArguments: [timelock.address, treasury.address, [500, 1000, 2000, 5000], 'api.VDAO/DonationSBT/'],
  });

  progressBar.tick({ status: 'Verifying RoundImplementation' });
  await hre.run('verify:verify', {
    address: roundImplementation.address,
    constructorArguments: [],
  });

  progressBar.tick({ status: 'Verifying RoundFactory' });
  await hre.run('verify:verify', {
    address: roundFactory.address,
    constructorArguments: [],
  });  


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
