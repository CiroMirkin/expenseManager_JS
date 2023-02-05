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
            this.showAccountValues()
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
    #getIncomes() {
        return this.allOfAmounts.filter(amount => amount.type == 'income')
    }
    #getExpenses() {
        return this.allOfAmounts.filter(amount => amount.type == 'expense')
    }
    #getTotalIncome(){
        let totalIncome = 0
        const income = this.#getIncomes()
        income.forEach(amount => totalIncome += amount.amount)
        return totalIncome
    }
    #getTotalExpenses() {
        let totalExpense = 0
        const expenses = this.#getExpenses()
        expenses.forEach(amount => totalExpense += amount.amount)
        return totalExpense
    }
    #getTotalAmount(){
        return this.#getTotalIncome() - this.#getTotalExpenses()
    }
    // View
    showIncomes() {
        this.#showListOfAmounts(this.#getIncomes())
    }
    showExpenses() {
        this.#showListOfAmounts(this.#getExpenses())
    }
    showAccountValues(){
        
    }
    onlyAmountAndCategorieInAmountsOf(amounts) {
        amounts = amounts.map(amount => ({
            amount: amount.amount,
            categorie: amount.categorie.name
        }))
        const simplifiedAmounts = {}
        amounts.forEach(amount => {
            if (!simplifiedAmounts[amount.categorie]) {
                simplifiedAmounts[amount.categorie] = 0;
            }
            simplifiedAmounts[amount.categorie] += amount.amount;
        })
        return simplifiedAmounts
    }
    giveFormatOfAmountsForDisplayedOnTheChart(amounts) {
        const amountsFormatted = [[], []]
        Object.entries(amounts).forEach(([categorie, amount]) => {
            amountsFormatted[0].push(categorie)
            amountsFormatted[1].push(amount)
        })
        return amountsFormatted
    }
    showChartIncomes() {
        const incomes = this.#getIncomes()
        const incomeListReduce = this.onlyAmountAndCategorieInAmountsOf(incomes)
        const [ categories, valueOfCategories ] = this.giveFormatOfAmountsForDisplayedOnTheChart(incomeListReduce)
        this.#showInChart(categories, valueOfCategories)
    }
    showChartExpenses() {
        const expenses = this.#getExpenses()
        const expenseListReduce = this.onlyAmountAndCategorieInAmountsOf(expenses)
        const [ categories, valueOfCategories ] = this.giveFormatOfAmountsForDisplayedOnTheChart(expenseListReduce)
        this.#showInChart(categories, valueOfCategories)
    }
}