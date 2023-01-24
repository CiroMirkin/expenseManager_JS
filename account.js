"use strict"
export default class Account {
    constructor(name) {
        this.name = name
        this.allOfAmounts = []
    }
    firstInit() {
        console.info(`${this.name} account init`)
        this.allOfAmounts = JSON.parse(localStorage.getItem(`total-${this.name}`)) || []
        if(!!this.allOfAmounts.length){
            this.showAllAmounts()
            this.showAccountValues()
        }
    }
    logAmount(amount) {
        this.allOfAmounts.push(amount)
        this.#saveAmounts()
    }
    editAmount({ amountId, newAmount }) {
        this.allOfAmounts = this.allOfAmounts.map(amount => {
            return amount.id == amountId ? {...newAmount} : amount
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
    #getTotalIncome(){
        let totalIncome = 0
        const income = this.allOfAmounts.filter(amount => amount.type == 'income')
        income.forEach(amount => totalIncome += amount.amount)
        return totalIncome
    }
    #getTotalExpenses() {
        let totalExpense = 0
        const expenses = this.allOfAmounts.filter(amount => amount.type == 'expense')
        expenses.forEach(amount => totalExpense += amount.amount)
        return totalExpense
    }
    #getTotalAmount(){
        return this.#getTotalIncome() - this.#getTotalExpenses()
    }
    showAllAmounts() {
        const amountListElement = document.getElementById('amountList')
        amountListElement.innerHTML =  this.allOfAmounts.map(amount =>`
            <li id="${amount.id}" class="card">
                <div class="card-body">
                    <div class="card-title h3">${amount.amount}</div>
                    <div class="card-subtitle mb-2 text-muted">${amount.type}</div>
                    <p class="card-text">${amount.comment}</p>
                    <button class="btn btn-primary" amount-action="edit">Edit</button>
                    <button class="btn btn-danger" amount-action="delete">Delete</button>
                </div>
            </li>
        ` ).join('')
    }
    showAccountValues(){
        const acoountValuesHTMLElement = document.getElementById('accountValues')
        acoountValuesHTMLElement.innerHTML = `<ul class="mx-3  rounded-2 border border-1 border-light-subtle border-opacity-50">
            <li><span class="fs-6 opacity-50">Total</span><div class="fs-1">${this.#getTotalAmount()}</div></li>
            <li><span class="fs-6 opacity-50">Income</span><div class="fs-2">${this.#getTotalIncome()}</div></li>
            <li><span class="fs-6 opacity-50">Expenses</span><div class="fs-2">${this.#getTotalExpenses()}</div></li>
        </ul>`
    }
}