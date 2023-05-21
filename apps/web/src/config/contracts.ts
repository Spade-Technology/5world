let contracts = {
  ethereum: {
    timelock: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    vDao: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    vDAOImplementation: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    treasury: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
    donationSBT: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
    roundImplementation: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
    roundFactory: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
  },
  sepolia: {
    timelock: '0xE3E0100dcF2730dDE08c65Dbe6B3a92A46742D31',
    vDao: '0xb0Cc561B939874C7978a1E83d4d53f209e4Ec6c3',
    vDAOImplementation: '0x6E152d811742473F21De6F2b0130544eaadB6aa9',
    treasury: '0xD84b9DE7935E6031FAAbaD28c1E081Ea58276E36',
    donationSBT: '0x635b62c7021AB14F798a3645aFeB4a5b65E57C8C',
    roundImplementation: '0x97a65b97472f1DeEa109fb2E255B40d98a8B2580',
    roundFactory: '0x5143A192082EdC298450e8d950e20130ea1F0a49',
  },
}

// Contracts end

export default contracts

export const currentChain = process.env.NODE_ENV === 'production' ? 'ethereum' : 'sepolia'
export const currentChainId = currentChain === 'ethereum' ? 1 : 11155111
export const currentContracts = contracts[currentChain]
