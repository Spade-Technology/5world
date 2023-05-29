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
  },
  sepolia: {
    timelock: '0x89Ce22e7e6F2BC59657CAd8da922462d7C5B4734',
    vDao: '0x43e5629Da128a8d935E54B58990cA0ad86411995',
    vDAOImplementation: '0x3Cd2D3AD62320E37894747B7c646E45F13E3dF96',
    proxiedVDao: '0x6D2E48fD08f4A28F5A39d92C0ac2301d7e8fDEfA',
    treasury: '0xf5506D8955A084991199B2DD09bE1FaabbF5099B',
    donationSBT: '0x9752f70abB9E09C9B8140556eF43bbA5493aE750',
    roundImplementation: '0x682387Dcf7d46C8E8C120704Bb3c95Dba3401d1a',
    roundFactory: '0x5732a22401E279ed15a4bd0292DDc7074e44c79a',
  },
}

// Contracts end

export default contracts

export const currentChain = process.env.VERCEL_ENV === 'production' ? 'ethereum' : 'sepolia'
export const currentChainId = currentChain === 'ethereum' ? 1 : 11155111
export const currentContracts = contracts[currentChain]
