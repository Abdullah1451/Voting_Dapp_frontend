require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli:{
      url: "https://goerli.infura.io/v3/85c2a64e02a243219378bf97bc7c9130",
      accounts:["f314f585a56768e1b42099d950084975631a4b2ead6325706fb55092f4feaf8c"],
      gasLimit: 123343,
      // gasPrice: 0.072489541
    }
  }
};
