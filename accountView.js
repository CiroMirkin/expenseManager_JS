export default class AccountView {
    constructor() {

    }
    // View
    showIncomes(incomes) {
        const incomeListElement = document.getElementById('incomeList')
        incomeListElement.innerHTML = incomes.map(income => (
            `<li id="${income.id}" class="list-group-item d-flex justify-content-between align-items-start">${income.amount}</li>`
        )).join('')
    }
    showExpenses(expenses) {
        const expenseListElement = document.getElementById('expenseList')
        expenseListElement.innerHTML = expenses.map(expense => (
            `<li id="${expense.id}" class="list-group-item d-flex justify-content-between align-items-start">${expense.amount}</li>`
        )).join('')
    }
    showAccountValue(value){
        document.getElementById('accountValue').innerText = value
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
    showChartTotal(amounts) {

    }
    showChartIncomes(incomes) {
        const incomeListReduce = this.onlyAmountAndCategorieInAmountsOf(incomes)
        const [ categories, valueOfCategories ] = this.giveFormatOfAmountsForDisplayedOnTheChart(incomeListReduce)
    
    }
    showChartExpenses(expenses) {
        const expenseListReduce = this.onlyAmountAndCategorieInAmountsOf(expenses)
        const [ categories, valueOfCategories ] = this.giveFormatOfAmountsForDisplayedOnTheChart(expenseListReduce)
    
    }
}