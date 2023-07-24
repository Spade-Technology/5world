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
    timelock: '0xdEB564370966b9D3A719FEfdc90dF9250B180B3A',
    vDao: '0xB96F5486cEd7B7AB1123B6065360fF46b5edc4C4',
    vDAOImplementation: '0xF75d788D52E5D1947860A3D358af8b09A5B8915f',
    proxiedVDao: '0x54357A2CEf849389258a73521969d97567AaA1eA',
    treasury: '0xc0BdbaDc572f367951127d2a18b1f38aE0E65C0E',
    donationSBT: '0x3130914cFbBee3fE8D62623592a2E0D27397E106',
    roundImplementation: '0x25205e324c5Fdd15100E889a8db188763131D6b3',
    roundFactory: '0x756306e07eB30da5124272378D0866CBb0c918aF',
    // 22 seconds
    blockTime: 15,
  },
}

// Contracts end

export default contracts

// export const currentChain = process.env.VERCEL_ENV === 'production' ? 'ethereum' : 'sepolia'
// export const currentChainId = currentChain === 'ethereum' ? 1 : 11155111
export const currentChain = 'sepolia'
export const currentChainId = 11155111
export const currentContracts = contracts[currentChain]
