const { Blockchain }  = require("./blockchain.js");
const { Transaction } = require("./transaction");
const Keygen = require("elliptic").ec;
const ec = new Keygen("secp256k1");

const myKey = ec.keyFromPrivate("090d2c76b9918d4e6ba07764ea9a12f8607e1b5ef0f3c633e85999651d5e9bb4");
const myWalletAddress = myKey.getPublic("hex");


let blockchain = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "Enter Public Key", 10);
tx1.signTransaction(myKey);
blockchain.addTransaction(tx1);


console.log("starting miner ");
blockchain.minePendingTransactions(myWalletAddress);

console.log("balance of my Wallet is "+blockchain.getBalanceForAddress(myWalletAddress));

console.log("Is chain valid? ", blockchain.isChainValid());