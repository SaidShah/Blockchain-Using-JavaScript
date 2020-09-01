const hashWithSha256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.data         = data;
        this.index        = index;
        this.previousHash = previousHash;
        this.timestamp    = timestamp;
        this.hash         = this.calculateHash();
    }

    calculateHash() {
        const data = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data);
        return hashWithSha256(data).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenisisBlock()];
    }

    createGenisisBlock() {
        return new Block(0, "08/01/2020", "Genesis Block", null);
    }

    getLastBlock() {
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash         = newBlock.calculateHash();
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
blockchain.addBlock(new Block(1, "08/23/2020", { coins: 23 }));
blockchain.addBlock(new Block(2, "08/29/2020", { coins: 11 }));

console.log(JSON.stringify(blockchain, null, 2));