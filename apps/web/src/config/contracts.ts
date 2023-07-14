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
    timelock: '0x22fE38bbc26360A82D4182239B390A2604614Fad',
    vDao: '0x9E873b3A125040B2295FbED16aF22Ed9b101e470',
    vDAOImplementation: '0x877093cC4D74AfA133C17d025dfB1d21489667f8',
    proxiedVDao: '0x52C46675B987Ee5374A0A5Ccc89b2DBA6810d44f',
    treasury: '0xC1Df339af6E7f77B3ED7Abd479E1a43062B7dc0b',
    donationSBT: '0x7153DC1E9cE74e736f5599B06460DC9C5AF2E1E1',
    roundImplementation: '0x0dd47B3061090DD574f1E591BA5d55f6C901359E',
    roundFactory: '0x3F493aF8567BD4502F90a76066C968781A9dcCb3',
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
