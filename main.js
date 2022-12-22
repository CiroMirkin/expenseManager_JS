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

addAmountSubmitInputBtn.addEventListener('click', e => {
    e.preventDefault()
    if(isTheInputValid()) {
        const newAmountForRegister = {
            amount: amountInput.value.trim(),
            type: amountTypeSelect.value,
            commment: commentInput.value.trim()
        }
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
