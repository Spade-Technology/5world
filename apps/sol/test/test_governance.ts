import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('VDao Governance', function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployFixture() {
    // Get the ContractFactory and Signers here.
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const Timelock = await ethers.getContractFactory('Timelock');
    const timelock = await Timelock.deploy(owner.address, 86400);
    await timelock.deployed();

    const VDao = await ethers.getContractFactory('VDaoToken');
    const vDao = await VDao.deploy(owner.address, timelock.address);
    await vDao.deployed();

    const VDAOImplementation = await ethers.getContractFactory('VDAOImplementation');
    const vDAOImplementation = await VDAOImplementation.deploy();
    await vDAOImplementation.deployed();

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

    // Fixtures can return anything you consider useful for your tests
    return { vDao, timelock, proxiedVDao, owner, addr1, addr2, addr3 };
  }
  // You can nest describe calls to create subsections.
  describe('Deployment', function () {
    it('Should initialise properly', async function () {
      // We use loadFixture to setup our environment, and then assert that things went well
      const { vDao, owner, timelock, proxiedVDao } = await loadFixture(deployFixture);
      expect(await proxiedVDao.vDAO()).to.equal(vDao.address);
      expect(await proxiedVDao.timelock()).to.equal(timelock.address);
      expect(await proxiedVDao.guardian()).to.equal(owner.address);
      expect(await proxiedVDao.votingPeriod()).to.equal(7200);
      expect(await proxiedVDao.votingDelay()).to.equal(1000);
      expect(await proxiedVDao.proposalThreshold()).to.equal('1000000000000000000000');
    });
  });
});
