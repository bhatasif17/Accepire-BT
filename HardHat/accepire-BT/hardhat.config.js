require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");

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

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    AvalancheFuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      accounts: [
        "cb22cc0b43511e2b66275932c88eb6df9737f77717f5b2d5e109ab3d89f7eb4f", //buyer
        "3c2aca99b9279475ca0f4fcf4290862cf37bf3c4885b05b3dfc31eccc276b0d3", //seller
        "f685bcc5e10b3628e3871f408aca5ff7303f0c5bbb506bc8abb900924ea303d2", //IssuingBank
        "e450d7322540b3740bd41b38c7113a83796fb30f5181c81c7dcfa412055d329a", //Corre Bank
        "7463d4ae66048ca4550aba5bcd4863c9870beca56db0a348e8f230827ffcce48", //Shipping Company
        "170480ac313694fa5374bccccfe6a3bf00086659a687295d1b9bdb0b0f2d2369", //Inspection Company
        "5dc0e8c915ef123bec22295d6a03754bb6cabc2595b57e09ba9dc9e54e9fd685", //Buyer Custome
        "a0d67ddbcee8a3ccb949ba59f7219f1b16d4bf4d73e0e5c6379a9829d6c7a33c" //Seller Customs
      ]
    },
    Fantom: {
      url: 'https://rpc.testnet.fantom.network',
      chainId: 4002,
      accounts: [
        "cb22cc0b43511e2b66275932c88eb6df9737f77717f5b2d5e109ab3d89f7eb4f", //buyer
        "3c2aca99b9279475ca0f4fcf4290862cf37bf3c4885b05b3dfc31eccc276b0d3", //seller
        "f685bcc5e10b3628e3871f408aca5ff7303f0c5bbb506bc8abb900924ea303d2", //IssuingBank
        "e450d7322540b3740bd41b38c7113a83796fb30f5181c81c7dcfa412055d329a", //Corre Bank
        "7463d4ae66048ca4550aba5bcd4863c9870beca56db0a348e8f230827ffcce48", //Shipping Company
        "170480ac313694fa5374bccccfe6a3bf00086659a687295d1b9bdb0b0f2d2369", //Inspection Company
        "5dc0e8c915ef123bec22295d6a03754bb6cabc2595b57e09ba9dc9e54e9fd685", //Buyer Custome
        "a0d67ddbcee8a3ccb949ba59f7219f1b16d4bf4d73e0e5c6379a9829d6c7a33c" //Seller Customs
      ]
    },
    Arbitrum: {
      url: 'https://rinkeby.arbitrum.io/rpc',
      chainId: 421611,
      accounts: [
        "cb22cc0b43511e2b66275932c88eb6df9737f77717f5b2d5e109ab3d89f7eb4f", //buyer
        "3c2aca99b9279475ca0f4fcf4290862cf37bf3c4885b05b3dfc31eccc276b0d3", //seller
        "f685bcc5e10b3628e3871f408aca5ff7303f0c5bbb506bc8abb900924ea303d2", //IssuingBank
        "e450d7322540b3740bd41b38c7113a83796fb30f5181c81c7dcfa412055d329a", //Corre Bank
        "7463d4ae66048ca4550aba5bcd4863c9870beca56db0a348e8f230827ffcce48", //Shipping Company
        "170480ac313694fa5374bccccfe6a3bf00086659a687295d1b9bdb0b0f2d2369", //Inspection Company
        "5dc0e8c915ef123bec22295d6a03754bb6cabc2595b57e09ba9dc9e54e9fd685", //Buyer Custome
        "a0d67ddbcee8a3ccb949ba59f7219f1b16d4bf4d73e0e5c6379a9829d6c7a33c" //Seller Customs
      ]
    },
    OptimisticEthereumL2: {
      url: 'https://kovan.optimism.io/',
      chainId: 69,
      accounts: [
        "cb22cc0b43511e2b66275932c88eb6df9737f77717f5b2d5e109ab3d89f7eb4f", //buyer
        "3c2aca99b9279475ca0f4fcf4290862cf37bf3c4885b05b3dfc31eccc276b0d3", //seller
        "f685bcc5e10b3628e3871f408aca5ff7303f0c5bbb506bc8abb900924ea303d2", //IssuingBank
        "e450d7322540b3740bd41b38c7113a83796fb30f5181c81c7dcfa412055d329a", //Corre Bank
        "7463d4ae66048ca4550aba5bcd4863c9870beca56db0a348e8f230827ffcce48", //Shipping Company
        "170480ac313694fa5374bccccfe6a3bf00086659a687295d1b9bdb0b0f2d2369", //Inspection Company
        "5dc0e8c915ef123bec22295d6a03754bb6cabc2595b57e09ba9dc9e54e9fd685", //Buyer Custome
        "a0d67ddbcee8a3ccb949ba59f7219f1b16d4bf4d73e0e5c6379a9829d6c7a33c" //Seller Customs
      ]
    },
    BinanceSmartChain: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      accounts: [
        "cb22cc0b43511e2b66275932c88eb6df9737f77717f5b2d5e109ab3d89f7eb4f", //buyer
        "3c2aca99b9279475ca0f4fcf4290862cf37bf3c4885b05b3dfc31eccc276b0d3", //seller
        "f685bcc5e10b3628e3871f408aca5ff7303f0c5bbb506bc8abb900924ea303d2", //IssuingBank
        "e450d7322540b3740bd41b38c7113a83796fb30f5181c81c7dcfa412055d329a", //Corre Bank
        "7463d4ae66048ca4550aba5bcd4863c9870beca56db0a348e8f230827ffcce48", //Shipping Company
        "170480ac313694fa5374bccccfe6a3bf00086659a687295d1b9bdb0b0f2d2369", //Inspection Company
        "5dc0e8c915ef123bec22295d6a03754bb6cabc2595b57e09ba9dc9e54e9fd685", //Buyer Custome
        "a0d67ddbcee8a3ccb949ba59f7219f1b16d4bf4d73e0e5c6379a9829d6c7a33c" //Seller Customs
      ]
    },
    polygon: {
      url: 'https://rpc-mumbai.maticvigil.com',
      chainId: 80001,
      accounts: [
        "cb22cc0b43511e2b66275932c88eb6df9737f77717f5b2d5e109ab3d89f7eb4f", //buyer
        "3c2aca99b9279475ca0f4fcf4290862cf37bf3c4885b05b3dfc31eccc276b0d3", //seller
        "f685bcc5e10b3628e3871f408aca5ff7303f0c5bbb506bc8abb900924ea303d2", //IssuingBank
        "e450d7322540b3740bd41b38c7113a83796fb30f5181c81c7dcfa412055d329a", //Corre Bank
        "7463d4ae66048ca4550aba5bcd4863c9870beca56db0a348e8f230827ffcce48", //Shipping Company
        "170480ac313694fa5374bccccfe6a3bf00086659a687295d1b9bdb0b0f2d2369", //Inspection Company
        "5dc0e8c915ef123bec22295d6a03754bb6cabc2595b57e09ba9dc9e54e9fd685", //Buyer Custome
        "a0d67ddbcee8a3ccb949ba59f7219f1b16d4bf4d73e0e5c6379a9829d6c7a33c" //Seller Customs
      ]
    },
    moonbeam: {
      url: 'https://rpc.testnet.moonbeam.network',
      chainId: 1287,
      accounts: [
        "cb22cc0b43511e2b66275932c88eb6df9737f77717f5b2d5e109ab3d89f7eb4f", //buyer
        "3c2aca99b9279475ca0f4fcf4290862cf37bf3c4885b05b3dfc31eccc276b0d3", //seller
        "f685bcc5e10b3628e3871f408aca5ff7303f0c5bbb506bc8abb900924ea303d2", //IssuingBank
        "e450d7322540b3740bd41b38c7113a83796fb30f5181c81c7dcfa412055d329a", //Corre Bank
        "7463d4ae66048ca4550aba5bcd4863c9870beca56db0a348e8f230827ffcce48", //Shipping Company
        "170480ac313694fa5374bccccfe6a3bf00086659a687295d1b9bdb0b0f2d2369", //Inspection Company
        "5dc0e8c915ef123bec22295d6a03754bb6cabc2595b57e09ba9dc9e54e9fd685", //Buyer Custome
        "a0d67ddbcee8a3ccb949ba59f7219f1b16d4bf4d73e0e5c6379a9829d6c7a33c" //Seller Customs
      ]
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/0a2f3875dc2b4fb18870a40c8f62f816",
      //accounts:{mnemonic: "praise arch mix permit pulp course hood above parent wash settle cable"}
      accounts: [
        "cb22cc0b43511e2b66275932c88eb6df9737f77717f5b2d5e109ab3d89f7eb4f", //buyer
        "3c2aca99b9279475ca0f4fcf4290862cf37bf3c4885b05b3dfc31eccc276b0d3", //seller
        "f685bcc5e10b3628e3871f408aca5ff7303f0c5bbb506bc8abb900924ea303d2", //IssuingBank
        "e450d7322540b3740bd41b38c7113a83796fb30f5181c81c7dcfa412055d329a", //Corre Bank
        "7463d4ae66048ca4550aba5bcd4863c9870beca56db0a348e8f230827ffcce48", //Shipping Company
        "170480ac313694fa5374bccccfe6a3bf00086659a687295d1b9bdb0b0f2d2369", //Inspection Company
        "5dc0e8c915ef123bec22295d6a03754bb6cabc2595b57e09ba9dc9e54e9fd685", //Buyer Custome
        "a0d67ddbcee8a3ccb949ba59f7219f1b16d4bf4d73e0e5c6379a9829d6c7a33c" //Seller Customs
      ]
    }
  },
  solidity: "0.8.4",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    }
  },
  gasReporter: {
    currency: 'USD',
    gas: "auto",
    //from: "0xB48b8d4a342054Be5Bf03981Fd36358Bf4e2BD29",
    gasPrice: "auto",
    coinmarketcap: "aa28d15a-4bb5-4b7f-9aca-9b22fac7d109",
    enabled:  false
  },
  mocha: {
    timeout: 70000
  },
 
};
