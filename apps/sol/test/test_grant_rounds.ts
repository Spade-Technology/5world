import { loadFixture, mine, mineUpTo } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BytesLike } from 'ethers/lib/utils';
import { ethers } from 'hardhat';
import { encodeRoundParameters } from '../scripts/utils';

describe('Grant Round', function () {
  const ROUND_OPERATOR_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('ROUND_OPERATOR'));

  const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';

  // some functions require having more than a 100 blocks form the first block ()
  it('advances the blocks', async function () {
    // await advanceBlock(100);
    mineUpTo(100);
  });

  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployFixture() {
    // Get the ContractFactory and Signers here.
    const Timelock = await ethers.getContractFactory('Timelock');

    const VDao = await ethers.getContractFactory('VDaoToken');
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const timelock = addr2;

    const vDao = await VDao.deploy(owner.address, timelock.address);
    await vDao.deployed();

    const DonationSBT = await ethers.getContractFactory('DummyNFT');
    const donationSBT = await DonationSBT.deploy();
    await donationSBT.deployed();

    const RoundImplementation = await ethers.getContractFactory('RoundImplementation');
    const roundImplementation = await RoundImplementation.deploy();
    await roundImplementation.deployed();

    const RoundFactory = await ethers.getContractFactory('RoundFactory');
    const roundFactory = await RoundFactory.deploy();
    await roundFactory.deployed();

    await roundFactory.initialize();
    await roundFactory.updateRoundContract(roundImplementation.address);

    const abi = ethers.utils.defaultAbiCoder;

    const currentBlockNumber = (await ethers.provider.getBlock('latest')).number;
    const initRoundTime = [
      currentBlockNumber + 100, // applicationsStartBlock
      currentBlockNumber + 500, // applicationsStartBlock
      currentBlockNumber + 500 + 50400, // roundStartBlock
      currentBlockNumber + 1000 + 50400, // roundEndBlock
    ];

    const adminRoles = [owner.address];
    const roundOperators = [owner.address, ethers.Wallet.createRandom().address, ethers.Wallet.createRandom().address];

    const roundMetaPtr = { protocol: 1, pointer: 'bafybeia4khbew3r2mkflyn7nzlvfzcb3qpfeftz5ivpzfwn77ollj47gqi' };
    const applicationMetaPtr = { protocol: 1, pointer: 'bafybeiaoakfoxjwi2kwh43djbmomroiryvhv5cetg74fbtzwef7hzzvrnq' };

    const initRoles = [adminRoles, roundOperators];

    const initMetaPtr = [roundMetaPtr, applicationMetaPtr];

    const matchingAmount = ethers.utils.parseEther('10');

    let params = [
      initRoundTime,
      vDao.address,
      donationSBT.address,
      ethers.constants.AddressZero,
      matchingAmount,
      initMetaPtr,
      initRoles,
    ];

    await roundFactory.create(encodeRoundParameters(params));
    const roundAddress = await roundFactory.latestRoundContract();
    const round = RoundImplementation.attach(roundAddress);

    // Fixtures can return anything you consider useful for your tests
    return {
      vDao,
      timelock,
      donationSBT,
      owner,
      currentBlockNumber,
      roundFactory,
      round,
      roundImplementation,
      adminRoles,
      roundOperators,
      roundMetaPtr,
      applicationMetaPtr,
      addr1,
      addr2,
      addr3,
      matchingAmount,
    };
  }

  // You can nest describe calls to create subsections.
  describe('Deployment', function () {
    it('Should initialise properly', async function () {
      const {
        round,
        vDao,
        donationSBT,
        currentBlockNumber,
        adminRoles,
        roundOperators,
        roundMetaPtr,
        applicationMetaPtr,
      } = await loadFixture(deployFixture);

      expect(await round.applicationsStartBlock()).to.equal(currentBlockNumber + 100);
      expect(await round.applicationsEndBlock()).to.equal(currentBlockNumber + 500);
      expect(await round.roundStartBlock()).to.equal(currentBlockNumber + 500 + 50400);
      expect(await round.roundEndBlock()).to.equal(currentBlockNumber + 1000 + 50400);
      expect(await round.vDAO()).to.equal(vDao.address);
      expect(await round.donationSBT()).to.equal(donationSBT.address);
      expect(await round.token()).to.equal(ethers.constants.AddressZero);
      expect(await round.matchingAmount()).to.equal(ethers.utils.parseEther('10'));

      const roundMeta = await round.roundMetaPtr();
      expect(roundMeta.pointer).equals(roundMetaPtr.pointer);
      expect(roundMeta.protocol).equals(roundMetaPtr.protocol);

      const applicationMeta = await round.applicationMetaPtr();
      expect(applicationMeta.pointer).equals(applicationMetaPtr.pointer);
      expect(applicationMeta.protocol).equals(applicationMetaPtr.protocol);

      expect(await round.getRoleMemberCount(DEFAULT_ADMIN_ROLE)).equals(adminRoles.length);
      expect(await round.getRoleMember(DEFAULT_ADMIN_ROLE, 0)).equals(adminRoles[0]);

      expect(await round.getRoleMemberCount(ROUND_OPERATOR_ROLE)).equals(roundOperators.length);
      expect(await round.getRoleMember(ROUND_OPERATOR_ROLE, 0)).equals(roundOperators[0]);
      expect(await round.getRoleMember(ROUND_OPERATOR_ROLE, 1)).equals(roundOperators[1]);
    });

    it('SHOULD revert when applicationsStartBlock is in the past', async function () {
      const {
        vDao,
        donationSBT,
        roundImplementation,
        currentBlockNumber,
        adminRoles,
        roundOperators,
        roundMetaPtr,
        applicationMetaPtr,
      } = await loadFixture(deployFixture);

      const initRoundTime = [
        currentBlockNumber - 100, // applicationsStartTime
        currentBlockNumber + 250, // applicationsEndTime
        currentBlockNumber + 500, // roundStartTime
        currentBlockNumber + 1000, // roundEndTime
      ];

      const initMetaPtr = [roundMetaPtr, applicationMetaPtr];

      const initRoles = [adminRoles, roundOperators];

      let params = [
        initRoundTime,
        vDao.address,
        donationSBT.address,
        ethers.constants.AddressZero,
        ethers.utils.parseEther('10'),
        initMetaPtr,
        initRoles,
      ];

      await expect(roundImplementation.initialize(encodeRoundParameters(params))).to.be.revertedWith(
        'initialize: applications start block has already passed'
      );
    });

    it('SHOULD revert when applicationsStartTime is after applicationsEndTime', async function () {
      const {
        vDao,
        donationSBT,
        roundImplementation,
        currentBlockNumber,
        adminRoles,
        roundOperators,
        roundMetaPtr,
        applicationMetaPtr,
      } = await loadFixture(deployFixture);

      const initRoundTime = [
        currentBlockNumber + 100, // applicationsStartTime
        currentBlockNumber + 50, // applicationsEndTime
        currentBlockNumber + 500, // roundStartTime
        currentBlockNumber + 1000, // roundEndTime
      ];

      const initMetaPtr = [roundMetaPtr, applicationMetaPtr];

      const initRoles = [adminRoles, roundOperators];

      let params = [
        initRoundTime,
        vDao.address,
        donationSBT.address,
        ethers.constants.AddressZero,
        ethers.utils.parseEther('10'),
        initMetaPtr,
        initRoles,
      ];

      await expect(roundImplementation.initialize(encodeRoundParameters(params))).to.be.revertedWith(
        'initialize: application end block should be after application start block'
      );
    });

    it('SHOULD revert if RoundStartTime is not 1 week (604800) after ApplicationEndTime', async function () {
      const {
        vDao,
        donationSBT,
        roundImplementation,
        currentBlockNumber,
        adminRoles,
        roundOperators,
        roundMetaPtr,
        applicationMetaPtr,
      } = await loadFixture(deployFixture);

      const initRoundTime = [
        currentBlockNumber + 100, // applicationsStartTime
        currentBlockNumber + 500, // applicationsEndTime
        currentBlockNumber + 5000, // roundStartTime
        currentBlockNumber + 10000, // roundEndTime
      ];

      const initMetaPtr = [roundMetaPtr, applicationMetaPtr];

      const initRoles = [adminRoles, roundOperators];

      let params = [
        initRoundTime,
        vDao.address,
        donationSBT.address,
        ethers.constants.AddressZero,
        ethers.utils.parseEther('10'),
        initMetaPtr,
        initRoles,
      ];

      await expect(roundImplementation.initialize(encodeRoundParameters(params))).to.be.revertedWith(
        'initialize: application end block should be 1 week before round start block'
      );
    });

    it('SHOULD revert when roundStartTime is after roundEndTime', async function () {
      const {
        vDao,
        donationSBT,
        roundImplementation,
        currentBlockNumber,
        adminRoles,
        roundOperators,
        roundMetaPtr,
        applicationMetaPtr,
      } = await loadFixture(deployFixture);

      const initRoundTime = [
        currentBlockNumber + 100, // applicationsStartTime
        currentBlockNumber + 500, // applicationsEndTime
        currentBlockNumber + 500 + 50400, // roundStartTime
        currentBlockNumber + 100 + 50400, // roundEndBlock
      ];

      const initMetaPtr = [roundMetaPtr, applicationMetaPtr];

      const initRoles = [adminRoles, roundOperators];

      let params = [
        initRoundTime,
        vDao.address,
        donationSBT.address,
        ethers.constants.AddressZero,
        ethers.utils.parseEther('10'),
        initMetaPtr,
        initRoles,
      ];

      await expect(roundImplementation.initialize(encodeRoundParameters(params))).to.be.revertedWith(
        'initialize: end block should be after start block'
      );
    });

    it('SHOULD revert ON invoking initialize on already initialized contract', async function () {
      const {
        vDao,
        donationSBT,
        round,
        currentBlockNumber,
        adminRoles,
        roundOperators,
        roundMetaPtr,
        applicationMetaPtr,
      } = await loadFixture(deployFixture);

      const initRoundTime = [
        currentBlockNumber + 100, // applicationsStartBlock
        currentBlockNumber + 500, // applicationsEndBlock
        currentBlockNumber + 500 + 50400, // roundStartBlock
        currentBlockNumber + 1000 + 50400, // roundEndBlock
      ];

      const initMetaPtr = [roundMetaPtr, applicationMetaPtr];

      const initRoles = [adminRoles, roundOperators];

      let params = [
        initRoundTime,
        vDao.address,
        donationSBT.address,
        ethers.constants.AddressZero,
        ethers.utils.parseEther('10'),
        initMetaPtr,
        initRoles,
      ];

      await expect(round.initialize(encodeRoundParameters(params))).to.be.revertedWith(
        'Initializable: contract is already initialized'
      );
    });
  });
  describe('test: applyToRound', () => {
    const newProjectMetaPtr = {
      protocol: 1,
      pointer: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
    };

    it('SHOULD revert WHEN invoked before applicationsStartBlock has started', async function () {
      const { round, addr1 } = await loadFixture(deployFixture);

      await expect(round.connect(addr1).applyToRound(newProjectMetaPtr, addr1.address)).to.be.revertedWithCustomError(
        round,
        'InvalidState'
      );
    });

    it('SHOULD revert WHEN invoked after applicationsEndBlock', async function () {
      const { round, addr1, currentBlockNumber } = await loadFixture(deployFixture);
      await mine(7500);

      await expect(round.connect(addr1).applyToRound(newProjectMetaPtr, addr1.address)).to.be.revertedWithCustomError(
        round,
        'InvalidState'
      );
    });

    it('SHOULD emit NewProjectApplication event', async () => {
      const { round, addr1, currentBlockNumber } = await loadFixture(deployFixture);
      await mine(110);

      const proposalCount = await round.proposalCount();

      expect(await round.connect(addr1).applyToRound(newProjectMetaPtr, addr1.address))
        .to.emit(round, 'NewProjectApplication')
        .withArgs(proposalCount + 1, [newProjectMetaPtr.protocol, newProjectMetaPtr.pointer], addr1.address);
    });
  });

  describe('test: vote', () => {
    const defaultPointer = { protocol: 0, pointer: '' };
    let ownerVotes: any[] = [];
    let addr1Votes: any[] = [];
    let ownerEncodedVotes: BytesLike[] = [];
    let addr1EncodedVotes: BytesLike[] = [];

    before(async () => {
      // const {vDao, round, addr1, addr2, addr3} = await loadFixture(deployFixture);

      // // createProposals
      // await round.connect(addr1).applyToRound(defaultPointer, addr1.address);
      // await round.connect(addr2).applyToRound(defaultPointer, addr2.address);
      // await round.connect(addr3).applyToRound(defaultPointer, addr3.address);

      // Prepare Votes
      ownerVotes = [
        [1, 500],
        [2, 1000],
        [3, 1000],
      ];

      addr1Votes = [
        [1, 500],
        [2, 500],
        [3, 2000],
      ];

      for (let i = 0; i < ownerVotes.length; i++) {
        ownerEncodedVotes.push(ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256'], ownerVotes[i]));
      }

      for (let i = 0; i < addr1Votes.length; i++) {
        addr1EncodedVotes.push(ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256'], addr1Votes[i]));
      }
    });

    it('SHOULD revert WHEN invoked before roundStartBlock', async function () {
      const { vDao, round, addr1, currentBlockNumber } = await loadFixture(deployFixture);

      // createProposals
      await mine(110);
      await round.connect(addr1).applyToRound(defaultPointer, addr1.address);

      await expect(round.vote(ownerEncodedVotes)).to.be.revertedWithCustomError(round, 'InvalidState');
    });

    it('SHOULD revert WHEN invoked after roundEndBlock', async function () {
      const { vDao, round, owner, addr1, currentBlockNumber } = await loadFixture(deployFixture);

      // createProposals
      mine(110);
      await round.connect(addr1).applyToRound(defaultPointer, addr1.address);
      const count = await round.proposalCount();
      // console.log(count)

      await vDao.delegate(owner.address);

      await mine(50400 + 1000);
      await expect(round.vote(ownerEncodedVotes)).to.be.revertedWithCustomError(round, 'InvalidState');
    });

    it('SHOULD emit VoteCast', async function () {
      const { vDao, round, currentBlockNumber } = await loadFixture(deployFixture);
      const [owner, addr1, addr2, addr3] = await ethers.getSigners();

      // createProposals
      await mine(110);
      await round.connect(addr1).applyToRound(defaultPointer, addr1.address);
      await round.connect(addr2).applyToRound(defaultPointer, addr2.address);
      await round.connect(addr3).applyToRound(defaultPointer, addr3.address);

      await mine(50400 + 500);

      await expect(round.vote(ownerEncodedVotes))
        .to.emit(round, 'VoteCast')
        .withArgs(ownerVotes[0][0], ownerVotes[0][1], owner.address)
        .to.emit(round, 'VoteCast')
        .withArgs(ownerVotes[1][0], ownerVotes[1][1], owner.address)
        .to.emit(round, 'VoteCast')
        .withArgs(ownerVotes[2][0], ownerVotes[2][1], owner.address);
    });

    it('SHOULD revert when total votes more than voting power', async function () {
      const { vDao, round, currentBlockNumber } = await loadFixture(deployFixture);
      const [owner, addr1, addr2, addr3] = await ethers.getSigners();

      // createProposals
      await mine(110);
      await vDao.transfer(addr1.address, 2500);
      await round.connect(addr1).applyToRound(defaultPointer, addr1.address);
      await round.connect(addr2).applyToRound(defaultPointer, addr2.address);
      await round.connect(addr3).applyToRound(defaultPointer, addr3.address);

      await mine(50400 + 500);

      await expect(round.connect(addr1).vote(addr1EncodedVotes)).to.be.revertedWithCustomError(
        round,
        'InsufficientVotingPower'
      );
    });

    it('SHOULD vote using donation SBT', async function () {
      const { vDao, donationSBT, round, currentBlockNumber } = await loadFixture(deployFixture);
      const [owner, addr1, addr2, addr3] = await ethers.getSigners();

      // createProposals
      await mine(110);
      await round.connect(addr1).applyToRound(defaultPointer, addr1.address);
      await round.connect(addr2).applyToRound(defaultPointer, addr2.address);
      await round.connect(addr3).applyToRound(defaultPointer, addr3.address);

      // minting donation SBT to addr1
      await donationSBT.safeMint(addr1.address);

      expect(await round.getTotalVotes(addr1.address)).to.equals(ethers.utils.parseEther('50')); // 50 credits per SBT
      await mine(50400 + 500);

      expect(await round.connect(addr1).vote(addr1EncodedVotes)).to.not.be.reverted;
    });

    it('Should distribute match Amount correctly.', async function () {
      const { vDao, round, matchingAmount } = await loadFixture(deployFixture);
      const [owner, addr1, addr2, addr3] = await ethers.getSigners();

      // createProposals
      await mine(110);
      await vDao.transfer(addr1.address, 10000);
      // funding round contract
      await owner.sendTransaction({
        to: round.address,
        value: ethers.utils.parseEther('10'), // Sends exactly 10 ether
      });

      await round.connect(addr1).applyToRound(defaultPointer, addr1.address);
      await round.connect(addr2).applyToRound(defaultPointer, addr2.address);
      await round.connect(addr3).applyToRound(defaultPointer, addr3.address);

      await mine(50400 + 500);

      await round.vote(ownerEncodedVotes);
      await round.connect(addr1).vote(addr1EncodedVotes);

      const proposal1TotalVotes =
        parseInt(Math.sqrt(ownerVotes[0][1]).toString()) + parseInt(Math.sqrt(addr1Votes[0][1]).toString());
      const proposal2TotalVotes =
        parseInt(Math.sqrt(ownerVotes[1][1]).toString()) + parseInt(Math.sqrt(addr1Votes[1][1]).toString());
      const proposal3TotalVotes =
        parseInt(Math.sqrt(ownerVotes[2][1]).toString()) + parseInt(Math.sqrt(addr1Votes[2][1]).toString());

      // console.log(proposal1TotalVotes, proposal2TotalVotes, proposal3TotalVotes)
      const totalVotes = proposal1TotalVotes ** 2 + proposal2TotalVotes ** 2 + proposal3TotalVotes ** 2;

      const proposal1MatchAmount = matchingAmount.mul(proposal1TotalVotes ** 2).div(totalVotes);
      const proposal2MatchAmount = matchingAmount.mul(proposal2TotalVotes ** 2).div(totalVotes);
      const proposal3MatchAmount = matchingAmount.mul(proposal3TotalVotes ** 2).div(totalVotes);
      await mine(600);
      await expect(round.distribute()).to.changeEtherBalances(
        [addr1.address, addr2.address, addr3.address],
        [proposal1MatchAmount, proposal2MatchAmount, proposal3MatchAmount]
      );
    });
  });
});
