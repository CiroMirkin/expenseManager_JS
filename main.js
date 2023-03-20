"use strict"
import Account from './account.js';
import AccountView from './accountView.js' 
import AccountDAO from './accountDAO.js'

const accountName = 'default'
const defaultAccount = new Account(accountName)
const accountView = new AccountView()
const accountDAO = new AccountDAO(accountName)

const uptadeView = (view, account) => {
    view.showIncomes(account.getIncomes())
    view.showExpenses(account.getExpenses())
    view.showAccountValue(account.getTotalAmount())
    view.showChartTotal(
        account.getTotalIncome(), 
        account.getTotalExpenses()
    )
}

defaultAccount.setSavedAmounts(accountDAO.getSavedAmounts())
uptadeView(accountView, defaultAccount)

const newAmountForm = document.getElementById('newAmountForm')
newAmountForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newAmount = getNewAmountFromForm()
    cleanForm()
    defaultAccount.logAmount(newAmount)
    uptadeView(accountView, defaultAccount)
    accountDAO.saveAmounts(defaultAccount.getAllAmounts())
})
const amountInput = document.getElementById('amountInput')
const amountTypeSelect = document.getElementById('amountTypeSelect')
const commentInput = document.getElementById('commentInput')
const getNewAmountFromForm = () => ({
    id: getAnID(),
    amount: formatAmount(amountInput.value),
    type: amountTypeSelect.value,
    comment: commentInput.value
})
const getAnID = () => {
    return Date.now().toString(35) + Math.random().toString(36).slice(2)
}
const formatAmount = (amount) => Number(amount)
const cleanForm = () => {
    amountInput.value = ''
    amountTypeSelect.value = 'none'
    commentInput.value = ''
}