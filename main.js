"use strict"

class Account {
    constructor(name) {
        this.name = name
        this.allOfAmounts = []
        this.incomes = []
        this.expenses = []
    }
    logAmount(amount) {
        this.allOfAmounts.push(amount)
        amount.type == 'income' ? this.incomes.push(amount) : this.expenses.push(amount)
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
            </li>
        ` ).join('')
    }
    getTotalIncome(){
        let totalIncome = 0
        this.incomes.forEach(amount => totalIncome += amount.amount)
        return totalIncome
    }
    getTotalExpenses() {
        let totalExpense = 0
        this.expenses.forEach(amount => totalExpense += amount.amount)
        return totalExpense
    }
    getTotalAmount(){
        return this.getTotalIncome() - this.getTotalExpenses()
    }
}

const addAmountSubmitInputBtn = document.getElementById('addAmountSubmitInputBtn')
const amountInput = document.getElementById('amountInput')
const amountTypeSelect = document.getElementById('amountTypeSelect')
const commentInput = document.getElementById('commentInput')

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
