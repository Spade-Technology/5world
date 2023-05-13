import { ethers } from 'hardhat';
import ProgressBar from 'progress';
import hre from 'hardhat';

const dev = true;

async function main() {
  const [owner] = await ethers.getSigners();

  // Initialize progress bar
  const progressBar = new ProgressBar('Deploying contracts [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: 18,
  });

  // Deploy Timelock contract
  progressBar.tick({ status: 'Deploying Timelock' });
  const Timelock = await ethers.getContractFactory('Timelock');
  const timelock = await Timelock.deploy(owner.address, dev ? 120 : 86400);
  await timelock.deployed();
  progressBar.tick();

  // Deploy VDaoToken contract
  progressBar.tick({ status: 'Deploying VDaoToken' });
  const VDao = await ethers.getContractFactory('VDaoToken');
  const vDao = await VDao.deploy(owner.address, timelock.address);
  await vDao.deployed();
  progressBar.tick();

  // Deploy VDAOImplementation contract
  progressBar.tick({ status: 'Deploying VDAOImplementation' });
  const VDAOImplementation = await ethers.getContractFactory('VDAOImplementation');
  const vDAOImplementation = await VDAOImplementation.deploy();
  await vDAOImplementation.deployed();
  progressBar.tick();

  // Deploy VDAOProxy contract
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
  progressBar.tick();

  // Deploy Treasury contract
  progressBar.tick({ status: 'Deploying Treasury' });
  const Treasury = await ethers.getContractFactory('Treasury');
  const treasury = await Treasury.deploy(vDao.address, timelock.address, 0);
  await treasury.deployed();
  progressBar.tick();

  // Deploy VDonations contract
  progressBar.tick({ status: 'Deploying VDonations' });
  const DonationSBT = await ethers.getContractFactory('VDonations');
  const donationSBT = await DonationSBT.deploy(
    timelock.address,
    treasury.address,
    [500, 1000, 2000, 5000],
    'api.VDAO/DonationSBT/'
  );
  await donationSBT.deployed();
  progressBar.tick();

  // Deploy RoundImplementation contract
  progressBar.tick({ status: 'Deploying RoundImplementation' });
  const RoundImplementation = await ethers.getContractFactory('RoundImplementation');
  const roundImplementation = await RoundImplementation.deploy();
  await roundImplementation.deployed();
  progressBar.tick();

  // Deploy RoundFactory contract
  progressBar.tick({ status: 'Deploying RoundFactory' });
  const RoundFactory = await ethers.getContractFactory('RoundFactory');
  const roundFactory = await RoundFactory.deploy();
  await roundFactory.deployed();
  progressBar.tick();

  // Initialize and update RoundFactory contract
  progressBar.tick({ status: 'Updating RoundFactory' });
  await roundFactory.initialize();
  await roundFactory.updateRoundContract(roundImplementation.address);
  progressBar.tick();

  const contracts = {
    timelock: timelock.address,
    vDao: vDao.address,
    vDAOImplementation: vDAOImplementation.address,

    treasury: treasury.address,
    donationSBT: donationSBT.address,
    roundImplementation: roundImplementation.address,
    roundFactory: roundFactory.address,
  };

  console.log(`-- vdao has successfully deployed on ${hre.network.name} --`);
  console.log('you can add the following to your contracts.ts file:');
  console.log(`contracts["${hre.network.name}"] = ${JSON.stringify(contracts, null, 2)};`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
