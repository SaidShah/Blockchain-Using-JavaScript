const { Block }       = require("./block");
const { Transaction } = require("./transaction");

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

module.exports.Blockchain = Blockchain;