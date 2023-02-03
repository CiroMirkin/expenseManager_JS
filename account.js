"use strict"
// import Chart from './chart.js'
export default class Account {
    constructor(name) {
        this.name = name
        this.allOfAmounts = []
    }
    firstInit() {
        console.info(`${this.name} account init`)
        this.allOfAmounts = JSON.parse(localStorage.getItem(`total-${this.name}`)) || []
        if(!!this.allOfAmounts.length){
            this.showIncomes()
            this.showAccountValues()
        }
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
    #saveAmounts(){
        localStorage.setItem(`total-${this.name}`, JSON.stringify(this.allOfAmounts))

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
    #showListOfAmounts(list) {
        const amountListElement = document.getElementById('amountList')
        amountListElement.innerHTML = list.map(amount =>`
            <li id="${amount.id}" class="list-group-item d-flex justify-content-between align-items-start">
                <div class="d-flex align-items-center">
                <div class="py-1 px-2 d-flex justify-content-center align-items-center border border-secondary rounded">${amount.categorie.HTMLIcon}</div>
                <div class="h5 mx-2 my-0">${amount.amount}</div>
                </div>
                <div>
                    <button class="btn btn-primary" amount-action="edit"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-danger" amount-action="delete"><i class="bi bi-trash3"></i></button>
                </div>
            </li>
        ` ).join('')
    }
    showIncomes() {
        this.#showListOfAmounts(this.#getIncomes())
    }
    showExpenses() {
        this.#showListOfAmounts(this.#getExpenses())
    }
    showAccountValues(){
        const acoountValuesHTMLElement = document.getElementById('accountValues')
        acoountValuesHTMLElement.innerHTML = `<ul class="mx-3  rounded-2 border border-1 border-light-subtle border-opacity-50">
            <li><span class="fs-6 opacity-50">Total</span><div class="fs-1">${this.#getTotalAmount()}</div></li>
        </ul>`
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
}