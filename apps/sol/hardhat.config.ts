// import Hardhat dependencies and plugins
import { HardhatUserConfig } from 'hardhat/types';

import '@nomicfoundation/hardhat-chai-matchers';
import '@nomiclabs/hardhat-ethers';

import '@nomiclabs/hardhat-etherscan';

import 'hardhat-abi-exporter';
import 'hardhat-gas-reporter';

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config();

// Initialize hardhat-tenderly plugin for automatic contract verification
var tdly = require("@tenderly/hardhat-tenderly");
tdly.setup({ automaticVerifications: true });

// Extend the HardhatUserConfig interface to include the etherscan, and gasReporter properties

interface ExtendedHardhatUserConfig extends HardhatUserConfig {
  etherscan?: {
    apiKey?: string;
  };
  gasReporter?: {
    currency?: string;
    gasPrice?: number;
    outputFile?: string;
  };
  abiExporter?: {
    path?: string;
    clear?: boolean;
    flat?: boolean;
    only?: string[];
    spacing?: number;
    runOnCompile?: boolean;
  };
  tenderly?: {
    project?: string;
    username?: string;
    privateVerification?: boolean;
  };
}

// Define the Hardhat configuration
const config: ExtendedHardhatUserConfig = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    ethereum: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [...((process.env.ETHEREUM_PRIVATE_KEY?.split(',') as string[]) || '')],
      chainId: 1,
    },

    ropsten: {
      url: `https://rpc.ankr.com/eth_ropsten`,
      accounts: [...((process.env.ETHEREUM_PRIVATE_KEY?.split(',') as string[]) || '')],
      chainId: 3,
    },
    
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [...((process.env.ETHEREUM_PRIVATE_KEY?.split(',') as string[]) || '')],
      chainId: 11155111,
    },
  },

  // Define the etherscan configuration
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },

  // Define the gasReporter configuration
  gasReporter: {
    currency: 'USD',
    gasPrice: 21,
    outputFile: process.env.CI ? 'gas-report.txt' : undefined,
  },

  // export ABIs to ../web/src/abi/
  abiExporter: {
    path: '../web/src/abi/',
    runOnCompile: true,
    clear: true,
    flat: true,
  },

  tenderly: {
    // Replace with project slug in Tenderly
    project: "vdao",
    // Replace with your Tenderly username
    username: "Brieyla",
    // Perform contract verification in private mode
    privateVerification: true,
  },
};

export default config;
