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
    timelock: '0x4e49B85709E36bCDdeC8E166eD5E7C2735C5BCe0',
    vDao: '0xA95b8F7A87a190B8059706A76012Aea9cA317BaE',
    vDAOImplementation: '0x4cfDE12894F58D0fa3e4fA4a5482cda6f046dC72',
    proxiedVDao: '0xc9279EB8db7576399070AB3546639696ba574562',
    treasury: '0x4a8b86c56E8416Bd752073E5ae68d89281093524',
    donationSBT: '0x71C5808EaB046c52Db0E725934f492f89C035aAB',
    roundImplementation: '0x5418C23F362496312E3555BEAB66B4B88e0AA53c',
    roundFactory: '0xE06B7E24C1AE7B7CC221f7A5E539F22b63a1eEB4',
    // 15 seconds
    blockTime: 12,
  },
}

// Contracts end

export default contracts

// export const currentChain = process.env.VERCEL_ENV === 'production' ? 'ethereum' : 'sepolia'
// export const currentChainId = currentChain === 'ethereum' ? 1 : 11155111
export const currentChain = 'sepolia'
export const currentChainId = 11155111
export const currentContracts = contracts[currentChain]
