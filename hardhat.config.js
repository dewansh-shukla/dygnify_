require("dotenv").config()
require("@nomicfoundation/hardhat-toolbox")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.8",
  networks: {
    mumbai: {
      url: "https://palpable-twilight-snow.matic-testnet.discover.quiknode.pro/2f68e9a22770eeebc0f33eda050d6e40b7bb5c2d/",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
}
