export default class Account {
    constructor(name) {
        this.name = name
        this.allOfAmounts = []
    }
    // DAO or content DAO
    firstInit() {
        console.info(`${this.name} account init`)
        this.allOfAmounts = JSON.parse(localStorage.getItem(`total-${this.name}`)) || []
        if(!!this.allOfAmounts.length){
            this.showIncomes()
            this.showExpenses()
            this.showAccountValue()
            this.showChartTotal()
        }
    }
    #saveAmounts(){
        localStorage.setItem(`total-${this.name}`, JSON.stringify(this.allOfAmounts))
    }
    // Domain
    logAmount(amount) {
        this.allOfAmounts.push(amount)
        this.#saveAmounts()
    }
    editAmount({ amountId, amountEdited }) {
        this.allOfAmounts = this.allOfAmounts.map(amount => {
            return amount.id == amountId ? {...amountEdited} : amount
        })
        this.#saveAmounts()
    }
    deleteAmount(amountId) {
        this.allOfAmounts = this.allOfAmounts.filter(amount => amount.id !== amountId)
        this.#saveAmounts()
    }
    getIncomes() {
        return this.allOfAmounts.filter(amount => amount.type == 'income')
    }
    getExpenses() {
        return this.allOfAmounts.filter(amount => amount.type == 'expense')
    }
    getTotalIncome(){
        let totalIncome = 0
        const income = this.#getIncomes()
        income.forEach(amount => totalIncome += amount.amount)
        return totalIncome
    }
    getTotalExpenses() {
        let totalExpense = 0
        const expenses = this.#getExpenses()
        expenses.forEach(amount => totalExpense += amount.amount)
        return totalExpense
    }
    getTotalAmount(){
        return this.#getTotalIncome() - this.#getTotalExpenses()
    }
}