const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config()

const web3 = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY, process.env.INFURA_ENDPOINT));
const contractJSON = require('../../build/contracts/BlockTriviaToken.json');

var contract = new web3.eth.Contract(contractJSON.abi, process.env.CONTRACT_ADDRESS, {
    defaultAccount: process.env.DEFAULT_ADDRESS, // default from address
    defaultGasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});

module.exports = { web3, contract };