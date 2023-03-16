"use strict"
import Account from './account.js';
import AccountView from './accountView.js' 
import AccountDAO from './accountDAO.js'

const accountName = 'default'
const defaultAccount = new Account(accountName)
const accountView = new AccountView()
const accountDAO = new AccountDAO(accountName)

defaultAccount.setSavedAmounts(accountDAO.getSavedAmounts())

const newAmountForm = document.getElementById('newAmountForm')
newAmountForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newAmount = getNewAmountFromForm()
    cleanForm()
    defaultAccount.logAmount(newAmount)
    accountView.showIncomes(defaultAccount.getIncomes())
    accountView.showExpenses(defaultAccount.getExpenses())
    accountView.showAccountValue(defaultAccount.getTotalAmount())
    accountView.showChartTotal(
        defaultAccount.getTotalIncome(), 
        defaultAccount.getTotalExpenses()
    )
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