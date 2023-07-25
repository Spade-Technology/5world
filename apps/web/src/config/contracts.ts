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
    timelock: '0x022430a9a4dD6DbA94631C01D3dc8745d3aa7A6A',
    vDao: '0x50a899d3eE5d8c6688ED867b141EAD298bf6c228',
    vDAOImplementation: '0x3C733b31cD4a9c41B57E711af07C02f468db99f2',
    proxiedVDao: '0x4a38e4861fDb8787b3B9DC4f9855136bc4dF3A41',
    treasury: '0x1D65DB880d1c78bD11986283970D2187759902BB',
    donationSBT: '0x35f66ba2653b55Bb990DeCb6Ce823d7B7745B048',
    roundImplementation: '0x76b0a8D4Af81b82030405C88D0cc58DF57aE0767',
    roundFactory: '0x233c4FDD4379ce1cF263Ead102f3011226039E0B',
    // 15 seconds
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
