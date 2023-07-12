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
    timelock: '0xDb541aD591E97E4617744bd9209DDeF923BC2bAb',
    vDao: '0x0B66296fC49bAcdA8A631BE1E1f328276ae5c8F9',
    vDAOImplementation: '0xD773d647F0D801F099e4Bd943c8C521B552EE25f',
    proxiedVDao: '0x3E4d30D787F882d2fA0BFC45Ef7b1B617Ef4EDd0',
    treasury: '0x2e7AEc70881328C3cd39FEe813C2715fF32A907e',
    donationSBT: '0xd3aAc6cE13b6De565a664D20FE4Ba00b3615b504',
    roundImplementation: '0x8b4178cE220a83d6da89Bb58d93AB6284bC1f2Fc',
    roundFactory: '0x0EC6B34B140b2a874716ca3F3f9c98e560003cA2',
  },
}

// Contracts end

export default contracts

// export const currentChain = process.env.VERCEL_ENV === 'production' ? 'ethereum' : 'sepolia'
// export const currentChainId = currentChain === 'ethereum' ? 1 : 11155111
export const currentChain = 'sepolia'
export const currentChainId = 11155111
export const currentContracts = contracts[currentChain]
