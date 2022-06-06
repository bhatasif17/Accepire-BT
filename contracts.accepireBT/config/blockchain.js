// This file contains only the basic configuration you need to run Embark's node
// For additional configurations, see: https://framework.embarklabs.io/docs/blockchain_configuration.html
module.exports = {
  // default applies to all environments
  default: {
    enabled: true,
    client: "geth" // Can be ganache-cli, geth or parity (default: geth)
  },

  development: {
    client: 'ganache-cli',
    clientConfig: {
      miningMode: 'dev' // Mode in which the node mines. Options: dev, auto, always, off
    },
    accounts: [
      {
        nodeAccounts: true, // Accounts use for the node
        addressIndex: "0",
        numAddresses: "1", // Number of addresses/accounts (defaults to 1)
        password: "config/development/password" // Password file for the accounts
      },
      //{
        //mnemonic: process.env.My12WordsMnemonic,
        //addressIndex: "0",
        //numAddresses: "1",
        // hdpath: "m/44'/60'/0'/0/"
     // }
    ],
  },

  privatenet: {
    // Accounts to use as node accounts
    // The order here corresponds to the order of `web3.eth.getAccounts`, so the first one is the `defaultAccount`
    // For more account configurations, see: https://framework.embarklabs.io/docs/blockchain_accounts_configuration.html
    accounts: [
      {
        nodeAccounts: true, // Accounts use for the node
        numAddresses: "1", // Number of addresses/accounts (defaults to 1)
        password: "config/development/password", // Password file for the accounts
        addressIndex: "0",
      }
    ],
    clientConfig: {
      datadir:"/Users/asifbhat/gethDataDir",
      //datadir: ".embark/privatenet/datadir", // Data directory for the databases and keystore
      //miningMode: 'auto',
      //genesisBlock: "config/privatenet/genesis.json" // Genesis block to initiate on first creation of a development node
      //genesisBlock:
    }
  },

  privateparitynet: {
    client: "parity",
    genesisBlock: "config/privatenet/genesis-parity.json",
    datadir: ".embark/privatenet/datadir",
    miningMode: 'off'
  },

  externalnode: {
    endpoint: "http://localhost:8545", // Endpoint of an node to connect to. Can be on localhost or on the internet
    gas: "auto",
    accounts: [
      
     // {
        //nodeAccounts: false,
        //numAddresses: "1",
        //password: "config/development/devpassword"
     // },
      // {
      //   //mnemonic: "husband response output cross bind relief wedding praise brass team mandate frame",
      //   addressIndex: "1",
      //   numAddresses: "1",
      //   hdpath: "m/44'/60'/0'/0/"

      // }
    ]
  },

  testnet: {
    networkType: "rinkeby", // Can be: testnet(ropsten), rinkeby, livenet or custom, in which case, it will use the specified networkId
    syncMode: "light",
    accounts: [
      {
        nodeAccounts: true,
        addressIndex: "0",
        password: "config/testnet/password"
      }
    ]
  },

  livenet: {
    networkType: "livenet",
    syncMode: "light",
    accounts: [
      {
        nodeAccounts: true,
        password: "config/livenet/password"
      }
    ]
  }

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  //custom_name: {
  //}
};
