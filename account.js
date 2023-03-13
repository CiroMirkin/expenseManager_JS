export default class Account {
    constructor(name) {
        this.name = name
        this.allOfAmounts = []
    }
    // Domain
    setSavedAmounts(savedAmounts) {
        this.allOfAmounts = [...this.allOfAmounts, ...savedAmounts]
    }
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