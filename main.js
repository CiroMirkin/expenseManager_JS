"use strict"

class Account {
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
            return amount.id == amountId ? {...newAmount, id: amountId} : amount
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
                    <button class="btn btn-primary" amount-action="edit" data-bs-toggle="modal" data-bs-target="#editAmountModal">Edit</button>
                    <button class="btn btn-danger" amount-action="delete">Delete</button>
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
}

const generateId = () => Date.now().toString(35) + Math.random().toString(36).slice(2)

const addAmountSubmitInputBtn = document.getElementById('addAmountSubmitInputBtn')
const amountInput = document.getElementById('amountInput')
const amountTypeSelect = document.getElementById('amountTypeSelect')
const commentInput = document.getElementById('commentInput')
const amountListHTMLElement = document.getElementById('amountList')

const defaultAccount = new Account('default')
defaultAccount.firstInit()

addAmountSubmitInputBtn.addEventListener('click', e => {
    e.preventDefault()
    if(isTheInputValid()) {
        const newAmountForRegister = {
            id: generateId(),
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
        defaultAccount.editAmount({ amountId, newAmount: {}})
    } 
    else if(amountActionName == 'delete') {
        defaultAccount.deleteAmount(amountId)
    }
    defaultAccount.showAllAmounts()
    defaultAccount.showAccountValues()
})