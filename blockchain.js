const { Block }       = require("./block");
const { Transaction } = require("./transaction");

class Blockchain {
    constructor() {
        this.chain               = [this.createGenisisBlock()];
        this.difficulty          = 3;
        this.miningReward        = 100;
        this.pendingTransactions = [];
    }

    createGenisisBlock() {
        return new Block("08/01/2020", "Genesis Block", null);
    }

    getLastBlock() {
        return this.chain[this.chain.length -1];
    }

    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransactions, this.getLastBlock().hash);
        block.mineNewBlock(this.difficulty);

        this.chain.push(block);
        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
    }

    addTransaction(transaction) {
        if(!transaction.fromAddress || !transaction.toAddress) {
            throw new Error("Invalid To or From Address");
        }

        if(!transaction.isValid()){
            throw new Error("Cannot Add Invalid Transaction To Blockchain");
        }

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

            if(!currentBlock.hasValidTransactions()) {
                return false;
            }

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