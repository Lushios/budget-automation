import mccsMapping from "./mccs_mapping.js";
const Transaction = class {
    constructor(transaction) {
        this.time = transaction.time;
        this.mcc = transaction.mcc;
        this.description = transaction.description
        this.amount = transaction.amount
    }

    toString() {
        const date = new Date(this.time * 1000);
        const category = mccsMapping[this.mcc];
        return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}\t${this.amount * -1 / 100}\t${this.description}\t${category}`;
    }
}

export default Transaction
