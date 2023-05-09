import { loadFixture, mine } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('VToken', function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const Timelock = await ethers.getContractFactory('Timelock');

    const VDao = await ethers.getContractFactory('VDaoToken');
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    // To deploy our contract, we just have to call VDao.deploy() and await
    // its deployed() method, which happens once its transaction has been
    // mined.
    // const timelock = await Timelock.deploy(owner.address, 86400)
    // await timelock.deployed()
    const timelock = addr2;

    const vDao = await VDao.deploy(owner.address, timelock.address);
    await vDao.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { vDao, timelock, owner, addr1, addr2, addr3 };
  }

  // You can nest describe calls to create subsections.
  describe('Deployment', function () {
    // `it` is another Mocha function. This is the one you use to define each
    // of your tests. It receives the test name, and a callback function.
    //
    // If the callback function is async, Mocha will `await` it.
    it('Should set the right timelock', async function () {
      // We use loadFixture to setup our environment, and then assert that
      // things went well
      const { vDao, timelock } = await loadFixture(deployTokenFixture);

      // `expect` receives a value and wraps it in an assertion object. These
      // objects have a lot of utility methods to assert values.

      // This test expects the owner variable stored in the contract to be
      // equal to our Signer's owner.
      expect(await vDao.timelock()).to.equal(timelock.address);
    });

    it('Should assign the total supply of tokens to the owner', async function () {
      const { vDao, owner } = await loadFixture(deployTokenFixture);
      const ownerBalance = await vDao.balanceOf(owner.address);
      expect(await vDao.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Transactions', function () {
    it('Should transfer tokens between accounts', async function () {
      const { vDao, owner, addr1 } = await loadFixture(deployTokenFixture);

      // Transfer 50 tokens from owner to addr1
      await expect(vDao.transfer(addr1.address, 50)).to.changeTokenBalances(vDao, [owner, addr1], [-50, 50]);

      //
      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      //   await expect(
      //     vDao.connect(addr1).transfer(addr2.address, 50)
      //   ).to.changeTokenBalances(vDao, [addr1, addr2], [-50, 50]);
    });

    it('Should emit Transfer events', async function () {
      const { vDao, owner, addr1 } = await loadFixture(deployTokenFixture);

      // Transfer 50 tokens from owner to addr1
      await expect(vDao.transfer(addr1.address, 50))
        .to.emit(vDao, 'Transfer')
        .withArgs(owner.address, addr1.address, 50);

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      //   await expect(vDao.connect(addr1).transfer(addr2.address, 50))
      //     .to.emit(vDao, "Transfer")
      //     .withArgs(addr1.address, addr2.address, 50);
    });

    it('Should fail if sender/receiver is not whitelisted', async function () {
      const { vDao, addr1, addr2 } = await loadFixture(deployTokenFixture);
      await vDao.transfer(addr1.address, 50);

      // Try to send 1 token from addr1 (0 tokens) to owner.
      // `require` will evaluate false and revert the transaction.
      await expect(vDao.connect(addr1).transfer(addr2.address, 1)).to.be.revertedWith(
        'V::_transferTokens: Trading not enabled'
      );

      // addr1 balance shouldn't have changed.
      expect(await vDao.balanceOf(addr1.address)).to.equal(50);
    });

    it('Should transfer after whitlisting Sender', async function () {
      const { vDao, addr1, addr2, timelock } = await loadFixture(deployTokenFixture);
      await vDao.transfer(addr1.address, 50);
      await vDao.connect(timelock).whitelistAccount(addr1.address, true);

      await expect(vDao.connect(addr1).transfer(addr2.address, 50)).to.changeTokenBalances(
        vDao,
        [addr1, addr2],
        [-50, 50]
      );
    });

    it('Should transfer after enabling trading', async function () {
      const { vDao, addr1, addr2, timelock } = await loadFixture(deployTokenFixture);
      await vDao.transfer(addr1.address, 50);

      await vDao.connect(timelock).enableTrading();
      // Try to send 1 token from addr1 (0 tokens) to owner.
      // `require` will evaluate false and revert the transaction.
      await expect(vDao.connect(addr1).transfer(addr2.address, 50)).to.changeTokenBalances(
        vDao,
        [addr1, addr2],
        [-50, 50]
      );
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const { vDao, owner, addr1, timelock } = await loadFixture(deployTokenFixture);
      const initialOwnerBalance = await vDao.balanceOf(owner.address);
      await vDao.connect(timelock).enableTrading();

      // Try to send 1 token from addr1 (0 tokens) to owner.
      // `require` will evaluate false and revert the transaction.
      await expect(vDao.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith(
        'V::_transferTokens: transfer amount exceeds balance'
      );

      // Owner balance shouldn't have changed.
      expect(await vDao.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });

    it('Balance checkpoint should update on transfer', async function () {
      const { vDao, owner, addr1 } = await loadFixture(deployTokenFixture);

      const blockNumber = (await ethers.provider.getBlock('latest')).number;
      const ownerBalanceBeforeTransfer = await vDao.balanceOf(owner.address);

      await mine(1000);
      await vDao.transfer(addr1.address, 100);
      await mine(1000);

      const ownerBalanceAfterTransfer = await vDao.balanceOf(owner.address);

      const ownerPriorBalanceBeforeTransfer = await vDao.getPriorBalance(owner.address, blockNumber + 100);
      const ownerPriorBalanceAfterTransfer = await vDao.getPriorBalance(owner.address, blockNumber + 1100);

      await expect(ownerPriorBalanceBeforeTransfer).to.equal(ownerBalanceBeforeTransfer);
      await expect(ownerPriorBalanceAfterTransfer).to.equal(ownerBalanceAfterTransfer);
    });

    it('Delegating votes', async function () {
      const { vDao, owner, addr2 } = await loadFixture(deployTokenFixture);
      await vDao.delegate(addr2.address);

      expect(await vDao.getCurrentVotes(addr2.address)).to.equal(await vDao.balanceOf(owner.address));
    });

    it('Delegate votes should update on transfer', async function () {
      const { vDao, addr1, addr2, addr3 } = await loadFixture(deployTokenFixture);

      await vDao.delegate(addr2.address);
      await vDao.connect(addr1).delegate(addr3.address);

      const ownerCurrentVotes = await vDao.getCurrentVotes(addr2.address);
      const addr1CurrentVotes = await vDao.getCurrentVotes(addr3.address);

      await vDao.transfer(addr1.address, 50);

      const ownerCurrentVotesAfterTransfer = await vDao.getCurrentVotes(addr2.address);
      const addr1CurrentVotesAfterTransfer = await vDao.getCurrentVotes(addr3.address);

      await expect(ownerCurrentVotesAfterTransfer).to.equal(ownerCurrentVotes - 50);
      await expect(addr1CurrentVotesAfterTransfer).to.equal(addr1CurrentVotes + 50);
    });
  });
});
