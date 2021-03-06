const hashWithSha256 = require('crypto-js/sha256');

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

    hasValidTransactions() {
        for(const tx of this.transactions) {
            if(!tx.isValid()) {
                return false;
            }
        }
        return true;
    }
}

module.exports.Block = Block;