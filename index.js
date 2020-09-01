const hashWithSha256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.amount      = amount;
        this.fromAddress = fromAddress;
        this.toAddress   = toAddress;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = "") {
        this.nonce        = 0;
        this.previousHash = previousHash;
        this.timestamp    = timestamp;
        this.transactions = transactions;
        this.hash         = this.calculateHash();
    }

    calculateHash() {
        const dataToHash = this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce;
        return hashWithSha256(dataToHash).toString();
    }

    mineNewBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("BLOCK MINED " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain               = [this.createGenisisBlock()];
        this.difficulty          = 3;
        this.miningReward        = 10;
        this.pendingTransactions = [];
    }

    createGenisisBlock() {
        return new Block("08/01/2020", "Genesis Block", null);
    }

    getLastBlock() {
        return this.chain[this.chain.length -1];
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineNewBlock(this.difficulty);

        console.log(" Successfully mined ")

        this.chain.push(block);
        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceForAddress(address) {
        let balance = 0;
        for(const block of this.chain) {
            for(const trans of block.transactions){
                if(trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if(trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            let currentBlock  = this.chain[i];
            let previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let blockchain = new Blockchain();
blockchain.createTransaction(new Transaction("address1", "address2", 100));
blockchain.createTransaction(new Transaction("address1", "address2", 44));

console.log("starting miner ");
blockchain.minePendingTransactions("address3");

console.log("balance of address3 is "+blockchain.getBalanceForAddress("address3"));

blockchain.minePendingTransactions("address4");

console.log("balance of address3 is "+blockchain.getBalanceForAddress("address3"));
