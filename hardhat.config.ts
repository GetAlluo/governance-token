import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import 'hardhat-contract-sizer'
import "./tasks"
dotenv.config();

//       From Alluo Smart Contract Developers - Happy New Year!!!
//
//                                  |
//                                \ ' /
//                              -- (*) --
//                                 >*<
//                                >0<@<
//                               >>>@<<*
//                              >@>*<0<<<
//                             >*>>@<<<@<<
//                            >@>>0<<<*<<@<
//                           >*>>0<<@<<<@<<<
//                          >@>>*<<@<>*<<0<*<
//            \*/          >0>>*<<@<>0><<*<@<<
//        ___\\U//___     >*>>@><0<<*>>@><*<0<<
//        |\\ | | \\|    >@>>0<*<0>>@<<0<<<*<@<<  
//        | \\| | _(UU)_ >((*))_>0><*<0><@<<<0<*<
//        |\ \| || / //||.*.*.*.|>>@<<*<<@>><0<<<
//        |\\_|_|&&_// ||*.*.*.*|_\\db//_               
//        """"|'.'.'.|~~|.*.*.*|     ____|_
//            |'.'.'.|   ^^^^^^|____|>>>>>>|
//            ~~~~~~~~         '""""`------'


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 4294967295,
      },
    },
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      forking: {
        url: "https://polygon-mainnet.g.alchemy.com/v2/6QuVBlBaST7y0SX7yjMc5kQjiT5HumAW",
        blockNumber: 20094469
      },
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    kovan: {
      url: process.env.KOVAN_URL || "",
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    rinkeby: {
      gas: 5000000,
      gasPrice: 20000000000,
      url: process.env.RINKEBY_URL || "",
      accounts: {
        mnemonic: process.env.MNEMONIC,
      }
    },
    maticmainnet: {
      url: "https://rpc-mainnet.maticvigil.com/",
      gasPrice: 30000000000,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 3600000,
  },

  contractSizer: {
    alphaSort: false,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: false,
  }

};

export default config;