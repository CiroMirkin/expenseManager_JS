"use strict"

class Account {
    constructor(name) {
        this.name = name
        this.allOfAmounts = []
        this.incomes = []
        this.expenses = []
        this.#firstInit()
    }
    async #firstInit() {
        console.info(`${this.name} account init`)
        this.allOfAmounts = await JSON.parse(localStorage.getItem(`total-${this.name}`)) || []
        this.incomes = JSON.parse(localStorage.getItem(`incomes-${this.name}`)) || []
        this.expenses = JSON.parse(localStorage.getItem(`expenses-${this.name}`)) || []
        if(!!this.allOfAmounts.length){
            this.showAllAmounts()
            this.showAccountValues()
        }
    }
    logAmount(amount) {
        this.allOfAmounts.push(amount)
        if(amount.type == 'income'){
            this.incomes.push(amount)
        } 
        if(amount.type == 'expense'){
            this.expenses.push(amount)
        }
        this.#saveAmounts()
    }
    editAmount(amountId) {

    }
    deleteAmount(amountId) {

    }
    #saveAmounts(){
        localStorage.setItem(`total-${this.name}`, JSON.stringify(this.allOfAmounts))
        localStorage.setItem(`expenses-${this.name}`, JSON.stringify(this.expenses))
        localStorage.setItem(`incomes-${this.name}`, JSON.stringify(this.incomes))

    }
    showAllAmounts() {
        const amountListElement = document.getElementById('amountList')
        amountListElement.innerHTML =  this.allOfAmounts.map(amount =>`
            <li class="amountList__amount">
                <div>
                    ${amount.amount}
                    <span>${amount.type}</span>
                </div>
                <p>${amount.comment}</p>
                <div class="amount-actions">
                    <button class="amount-actions__action" amount-action="edit">Edit</button>
                    <button class="amount-actions__action" amount-action="delete">Delete</button>
                </div>
            </li>
        ` ).join('')
    }
    showAccountValues(){
        const acoountValuesHTMLElement = document.getElementById('accountValues')
        acoountValuesHTMLElement.innerHTML = `<ul>
            <li><span>Total</span><div>${this.#getTotalAmount()}</div></li>
            <li><span>Income</span><div>${this.#getTotalIncome()}</div></li>
            <li><span>Expenses</span><div>${this.#getTotalExpenses()}</div></li>
        </ul>`
    }
    #getTotalIncome(){
        let totalIncome = 0
        this.incomes.forEach(amount => totalIncome += amount.amount)
        return totalIncome
    }
    #getTotalExpenses() {
        let totalExpense = 0
        this.expenses.forEach(amount => totalExpense += amount.amount)
        return totalExpense
    }
    #getTotalAmount(){
        return this.#getTotalIncome() - this.#getTotalExpenses()
    }
}

const addAmountSubmitInputBtn = document.getElementById('addAmountSubmitInputBtn')
const amountInput = document.getElementById('amountInput')
const amountTypeSelect = document.getElementById('amountTypeSelect')
const commentInput = document.getElementById('commentInput')
const amountListHTMLElement = document.getElementById('amountList')

const defaultAccount = new Account('default')

addAmountSubmitInputBtn.addEventListener('click', e => {
    e.preventDefault()
    if(isTheInputValid()) {
        const newAmountForRegister = {
            amount: Number(amountInput.value),
            type: amountTypeSelect.value,
            comment: commentInput.value
        }
        defaultAccount.logAmount(newAmountForRegister)
        defaultAccount.showAllAmounts()
        defaultAccount.showAccountValues()
        cleanInputs()
    }
})

const isTheInputValid = () => {
    return !!amountInput.value.trim() && !!commentInput.value.trim() && amountTypeSelect.value !== 'none'
}

const cleanInputs = () => {
    amountInput.value = ''
    amountTypeSelect.value = 'none'
    commentInput.value = ''
}

amountListHTMLElement.addEventListener('click', (e) => {
    const amountActionName = e.target.attributes["amount-action"].value
    const amountId = e.target.parentElement.parentElement.id
    if(amountActionName == 'edit') {
        defaultAccount.editAmount(amountId)
    } 
    else if(amountActionName == 'delete') {
        defaultAccount.deleteAmount(amountId)
    }
})