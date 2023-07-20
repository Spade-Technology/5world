let contracts = {
  ethereum: {
    timelock: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    vDao: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    vDAOImplementation: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    proxiedVDao: '0xe0330ea4850daBAB12198d590D55A6e162bC442e',
    treasury: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
    donationSBT: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
    roundImplementation: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
    roundFactory: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
    blockTime: 12.08,
  },
  sepolia: {
    timelock: '0x8c4E18C490d873cC5f637B1bcACDb35488957785',
    vDao: '0x0C37Ec6C7c0eF9A27e9009a4c9eFF85ea795834E',
    vDAOImplementation: '0xa5291538c26a045D15b767930c509074feb22037',
    proxiedVDao: '0x890A6D4eA79BEE424B57a6C2588C2869b7fa8699',
    treasury: '0x74D7a9bb24e2162ED3aa8EE5279AD6BeFEeBc5E2',
    donationSBT: '0xa80aa6022e1E2F846e671c5ab6f600F22E22B0Cf',
    roundImplementation: '0x55AC44D9619927758e10Fe6650e1Cb5B7e9e960B',
    roundFactory: '0x719BeC3DAa2C813f8e34155E1A4a13f6A964467B',
    // 22 seconds
    blockTime: 22,
  },
}

// Contracts end

export default contracts

// export const currentChain = process.env.VERCEL_ENV === 'production' ? 'ethereum' : 'sepolia'
// export const currentChainId = currentChain === 'ethereum' ? 1 : 11155111
export const currentChain = 'sepolia'
export const currentChainId = 11155111
export const currentContracts = contracts[currentChain]
