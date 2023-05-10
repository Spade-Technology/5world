// Import Hardhat dependencies and plugins
import { HardhatUserConfig } from 'hardhat/types';

import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomicfoundation/hardhat-chai-matchers';
import 'hardhat-gas-reporter';

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config();

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
};

export default config;
