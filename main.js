"use strict"

class Account {
    constructor(name) {
        this.name = name
        this.allOfAmounts = []
    }
    logAmount(amount) {
        this.allOfAmounts.push(amount)
    }
    getAllOfAmounts() {
        return [...this.allOfAmounts]
    }
}

const addAmountSubmitInputBtn = document.getElementById('addAmountSubmitInputBtn')
const amountInput = document.getElementById('amountInput')
const amountTypeSelect = document.getElementById('amountTypeSelect')
const commentInput = document.getElementById('commentInput')
const amountListElement = document.getElementById('amountList')

const defaultAccount = new Account('default')

addAmountSubmitInputBtn.addEventListener('click', e => {
    e.preventDefault()
    if(isTheInputValid()) {
        const newAmountForRegister = {
            amount: amountInput.value,
            type: amountTypeSelect.value,
            comment: commentInput.value
        }
        defaultAccount.logAmount(newAmountForRegister)
        showNewAmount(defaultAccount)
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

const showAllOfAmounts = (account) => {
    const allOfAmounts = account.getAllOfAmounts()
    amountListElement.innerHTML =  allOfAmounts.map(amount =>`
        <li class="amountList__amount">
            <div>
                ${amount.amount}
                <span>${amount.type}</span>
            </div>
            <p>${amount.comment}</p>
        </li>
    ` ).join('')
}

const showNewAmount = (account) => {
    const allOfAmounts = account.getAllOfAmounts()
    const newAmount = allOfAmounts.at(-1)
    amountListElement.innerHTML +=  `
        <li class="amountList__amount">
            <div>
                ${newAmount.amount}
                <span>${newAmount.type}</span>
            </div>
            <p>${newAmount.comment}</p>
        </li>
    `
}