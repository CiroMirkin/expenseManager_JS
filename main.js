"use strict"
import Account from './account.js';
import AccountView from './accountView.js' 
import AccountDAO from './accountDAO.js'

const defaultAccount = new Account('default')
defaultAccount.firstInit()

const newAmountForm = document.getElementById('newAmountForm')
newAmountForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newAmount = getNewAmountFromForm()
    cleanForm()
    defaultAccount.logAmount(newAmount)
    defaultAccount.showIncomes()
    defaultAccount.showExpenses()
    defaultAccount.showAccountValue()
})
const amountInput = document.getElementById('amountInput')
const amountTypeSelect = document.getElementById('amountTypeSelect')
const commentInput = document.getElementById('commentInput')
const getNewAmountFromForm = () => ({
    id: 1,
    amount: Number(amountInput.value),
    type: amountTypeSelect.value,
    comment: commentInput.value
})
const cleanForm = () => {
    amountInput.value = ''
    amountTypeSelect.value = 'none'
    commentInput.value = ''
}