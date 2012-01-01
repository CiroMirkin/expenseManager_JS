export default class AccountDAO {
    constructor(accountName) {
        this.accountName = accountName
    }
    getSavedAmounts() {
        const allOfAmounts = JSON.parse(localStorage.getItem(`total-${this.accountName}`)) || []
        if(!!allOfAmounts.length){
            return allOfAmounts
        }
    }
    saveAmounts(amounts){
        localStorage.setItem(`total-${this.accountName}`, JSON.stringify(amounts))
    }
}