const { Blockchain }  = require("./blockchain.js");
const { Transaction } = require("./transaction");


let blockchain = new Blockchain();
blockchain.createTransaction(new Transaction("address1", "address2", 100));
blockchain.createTransaction(new Transaction("address1", "address2", 44));

console.log("starting miner ");
blockchain.minePendingTransactions("address3");

console.log("balance of address3 is "+blockchain.getBalanceForAddress("address3"));

blockchain.minePendingTransactions("address4");

console.log("balance of address3 is "+blockchain.getBalanceForAddress("address3"));
