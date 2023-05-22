import { ethers } from 'hardhat';
import ProgressBar from 'progress';
import hre from 'hardhat';

const dev = true;

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  const [owner] = await ethers.getSigners();

  const progressBar = new ProgressBar('Deploying contracts [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: 26,
  });

  progressBar.tick({ status: 'Deploying Timelock' });
  const Timelock = await ethers.getContractFactory('Timelock');
  const timelock = await Timelock.deploy(owner.address, dev ? 120 : 86400);
  await timelock.deployed();
  progressBar.tick();

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
    1000,
    '1000000000000000000000'
  );
  await vDAOProxy.deployed();

  await timelock.setPendingAdmin(vDAOProxy.address);

  const proxiedVDao = await VDAOImplementation.attach(vDAOProxy.address);
  await proxiedVDao._initiate();
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

  await sleep(5000);

  // Start Verification process
  progressBar.tick({ status: 'Verifying Timelock' });
  await hre.run('verify:verify', {
    address: timelock.address,
    constructorArguments: [owner.address, dev ? 120 : 86400],
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

  console.log(`-- vdao has successfully deployed on ${hre.network.name} --`);
  console.log('you can add the following to your contracts.ts file:');
  console.log(`${hre.network.name}: ${JSON.stringify(contracts, null, 2)};`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
