type Contracts = {
  [chainName: string]: {
    [contractName: string]: string;
  };
};
let contracts: Contracts = {};

// Contracts start

contracts["local"] = {
  timelock: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  vDao: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  vDAOImplementation: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  treasury: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
  donationSBT: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
  roundImplementation: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
  roundFactory: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
};

contracts["sepolia"] = {
  timelock: "0x0D8D56018166BeC92c0f9E49393f385f78C3ad4F",
  vDao: "0x9eA88C697702a8C646420D600DB596386f4Bb2D9",
  vDAOImplementation: "0x076b9749de115169c415b1F56C7b7f10aDbDee61",
  treasury: "0x9EBd3e55d10ADEc5bD4Eb24FD7cdf53eEDbE7a3F",
  donationSBT: "0x006E6Ba5D10982ED9f3610C7ffce4779df7496a2",
  roundImplementation: "0x12e15EC0acdE35653F67c72Fd79d7e149C4DFb94",
  roundFactory: "0x935D9bC9578D725881B5e9E6DbB4a65ca1D1eB65",
};

// Contracts end

export default contracts;
