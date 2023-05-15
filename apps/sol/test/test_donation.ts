import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { constants } from './constants';

describe('Treasury', function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployFixture() {
    // Get the ContractFactory and Signers here.
    const VDao = await ethers.getContractFactory('VDaoToken');
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const timelock = addr2;

    const vDao = await VDao.deploy(owner.address, timelock.address);
    await vDao.deployed();

    const Treasury = await ethers.getContractFactory('Treasury');
    const treasury = await Treasury.deploy(vDao.address, timelock.address, 0);
    await treasury.deployed();

    const DonationSBT = await ethers.getContractFactory('VDonations');
    const donationSBT = await DonationSBT.deploy(
      timelock.address,
      treasury.address,
      [500, 1000, 2000, 5000],
      'api.VDAO/DonationSBT/'
    );
    await donationSBT.deployed();

    await treasury.connect(timelock).setDonationSBT(donationSBT.address);

    const usdc_holder = await ethers.getImpersonatedSigner(constants.mainnet.USDC_HOLDER);
    const shib_holder = await ethers.getImpersonatedSigner(constants.mainnet.SHIB_HOLDER);

    // Fixtures can return anything you consider useful for your tests
    return { vDao, timelock, treasury, donationSBT, owner, usdc_holder, shib_holder, addr1, addr2, addr3 };
  }
  // You can nest describe calls to create subsections.
  describe('Deployment', function () {
    // `it` is another Mocha function. This is the one you use to define each
    // of your tests. It receives the test name, and a callback function.
    //
    // If the callback function is async, Mocha will `await` it.
    it('Should set the right supportedTokens', async function () {
      // We use loadFixture to setup our environment, and then assert that
      // things went well
      const { treasury, vDao, timelock } = await loadFixture(deployFixture);

      expect(await treasury.supportedTokens(constants.mainnet.USDC)).to.equal(true);
      expect(await treasury.supportedTokens(constants.mainnet.USDT)).to.equal(true);
      expect(await treasury.supportedTokens(constants.mainnet.DAI)).to.equal(true);
      expect(await treasury.supportedTokens(constants.mainnet.ETH)).to.equal(true);
      expect(await treasury.supportedTokens(constants.mainnet.SHIB)).to.equal(false);
    });

    it('Should assign the correct donation tier', async function () {
      const { donationSBT } = await loadFixture(deployFixture);

      expect(await donationSBT.getTierLimit(0)).to.equal(500);
      expect(await donationSBT.getTierLimit(1)).to.equal(1000);
      expect(await donationSBT.getTierLimit(2)).to.equal(2000);
      expect(await donationSBT.getTierLimit(3)).to.equal(5000);
    });
  });
  describe('Donation', function () {
    it("Shouldn't accept donation of unsupported tokens", async function () {
      const { treasury, shib_holder } = await loadFixture(deployFixture);

      const Token = await ethers.getContractFactory('Token');
      const shib = await Token.attach(constants.mainnet.SHIB);
      await shib.connect(shib_holder).approve(treasury.address, 10000000);

      await expect(
        treasury.connect(shib_holder).donate(constants.mainnet.SHIB, 10000000)
      ).to.be.revertedWithCustomError(treasury, 'TokenNotSupported');
    });

    it('Should increase treasury balance', async function () {
      const { treasury, usdc_holder } = await loadFixture(deployFixture);

      const Token = await ethers.getContractFactory('Token');
      const usdc = await Token.attach(constants.mainnet.USDC);
      await usdc.connect(usdc_holder).approve(treasury.address, 500);

      await expect(treasury.connect(usdc_holder).donate(constants.mainnet.USDC, 500)).to.changeTokenBalances(
        usdc,
        [usdc_holder.address, treasury.address],
        [-500, 500]
      );
    });

    it('Should emit DonationReceived event', async function () {
      const { treasury, usdc_holder } = await loadFixture(deployFixture);

      const Token = await ethers.getContractFactory('Token');
      const usdc = await Token.attach(constants.mainnet.USDC);
      await usdc.connect(usdc_holder).approve(treasury.address, 500000000);

      await expect(treasury.connect(usdc_holder).donate(constants.mainnet.USDC, 500000000))
        .to.emit(treasury, 'DonationReceived')
        .withArgs(usdc_holder.address, usdc.address, 500000000, 500);
    });

    it('Should receive DonationSBT', async function () {
      const { treasury, usdc_holder, donationSBT } = await loadFixture(deployFixture);

      const Token = await ethers.getContractFactory('Token');
      const usdc = await Token.attach(constants.mainnet.USDC);
      await usdc.connect(usdc_holder).approve(treasury.address, 5000000000);

      await expect(treasury.connect(usdc_holder).donate(constants.mainnet.USDC, 5000000000)).to.changeTokenBalance(
        donationSBT,
        usdc_holder.address,
        1
      );
    });

    it('Should update DonationSBT tier', async function () {
      const { treasury, usdc_holder, donationSBT } = await loadFixture(deployFixture);

      const Token = await ethers.getContractFactory('Token');
      const usdc = await Token.attach(constants.mainnet.USDC);
      await usdc.connect(usdc_holder).approve(treasury.address, 5000000000000);
      await treasury.connect(usdc_holder).donate(constants.mainnet.USDC, 500000000);

      expect(await donationSBT.tokenURIByAddress(usdc_holder.address)).to.equal('api.VDAO/DonationSBT/1');

      await treasury.connect(usdc_holder).donate(constants.mainnet.USDC, 1500000000);
      expect(await donationSBT.tokenURIByAddress(usdc_holder.address)).to.equal('api.VDAO/DonationSBT/3');

      await treasury.connect(usdc_holder).donate(constants.mainnet.USDC, 5000000000);
      expect(await donationSBT.tokenURIByAddress(usdc_holder.address)).to.equal('api.VDAO/DonationSBT/4');
    });
  });
});
