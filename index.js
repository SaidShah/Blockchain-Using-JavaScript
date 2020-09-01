const hashWithSha256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.data         = data;
        this.index        = index;
        this.nonce        = 0;
        this.previousHash = previousHash;
        this.timestamp    = timestamp;
        this.hash         = this.calculateHash();
    }

    calculateHash() {
        const data = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce;
        return hashWithSha256(data).toString();
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
        this.chain      = [this.createGenisisBlock()];
        this.difficulty = 4;
    }

    createGenisisBlock() {
        return new Block(0, "08/01/2020", "Genesis Block", null);
    }

    getLastBlock() {
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.mineNewBlock(this.difficulty);
        this.chain.push(newBlock);
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
console.log("Mining block ....")
blockchain.addBlock(new Block(1, "08/23/2020", { coins: 23 }));
console.log("Mining block ....")
blockchain.addBlock(new Block(2, "08/29/2020", { coins: 11 }));
