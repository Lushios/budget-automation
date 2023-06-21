import 'dotenv/config';
import MonobankClient from './monobank_client.js'
import fs from 'fs'
import Transaction from './transaction.js'

// use class-transformer?

const monobankClient = new MonobankClient(process.env.MONOBANK_TOKEN)

const run_script = async () => {
    const transactions = await monobankClient.get_statement(process.env.ACCOUNT_ID, 1686402061);
    const new_transactions = transactions.map(transaction => new Transaction(transaction));

    let string = '';
    new_transactions.forEach(transaction => {
        string += transaction;
        string += "\n";
    })

    fs.writeFile('./transactions.txt', string, err => {
        if (err) {
            console.log(err);
        }
    });
    fs.writeFile('./log.txt', JSON.stringify(transactions), err => {
        if (err) {
            console.log(err);
        }
    });
}

console.log('script started')

run_script().then( () => {
    console.log('script finished')
})

// sort by date asc, fix the date output, filter out rounding bs (maybe all transactions sub 8 hrn), also filter transfers between own cards
