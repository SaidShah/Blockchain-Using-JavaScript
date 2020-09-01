class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.amount      = amount;
        this.fromAddress = fromAddress;
        this.toAddress   = toAddress;
    }
}

module.exports.Transaction = Transaction;