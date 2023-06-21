import fetch from 'node-fetch';

const MonobankClient = class {
    constructor(token) {
        this.url = 'https://api.monobank.ua'
        this.token = token
    }

    async get_personal_info(){
        const response = await fetch(
            this.url + "/personal/client-info",
            {
                method: "GET",
                headers: {'X-token': this.token}
            }
        )

        return await response.json()
    }

    async get_statement(accountId, from, to = '') {
        const response = await fetch(
            `https://api.monobank.ua/personal/statement/${accountId}/${from}` + (to !== '' ? `/${to}` : ``),
            {
                method: "GET",
                headers: {'Content-Type': 'application/json', 'X-token': this.token}
            }
        );

        if (!response.ok) {
            throw new Error(`Error ${response.status},  ${await response.text()}`)
        }

        return await response.json()
    }
}

export default MonobankClient
