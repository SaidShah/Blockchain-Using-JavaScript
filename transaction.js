const hashWithSha256 = require('crypto-js/sha256');
const Keygen         = require("elliptic").ec;
const ec             = new Keygen("secp256k1");

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.amount      = amount;
        this.fromAddress = fromAddress;
        this.toAddress   = toAddress;
    }

    calculateHash() {
        const dataToHash = this.fromAddress + this.toAddress + this.amount
        return hashWithSha256(dataToHash).toString();
    }

    signTransaction(signingKey) {
        if(signingKey.getPublic("hex") !== this.fromAddress) {
            throw new Error("Invalid Public Key");
        }

        const hashedTx  = this.calculateHash();
        const signature = signingKey.sign(hashedTx, "base64");
        this.signature  = signature.toDER("hex");
    }

    isValid() {
        if(this.fromAddress === null) return true;

        if(!this.signature || this.signature.length === 0) {
            throw new Error("No Signature Found");
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

module.exports.Transaction = Transaction;