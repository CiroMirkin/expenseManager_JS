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

const amountListsElement = document.getElementById('amountLists')
amountListsElement.addEventListener('click', (e) => {
    if(isAnAmount(e)) {
        const action = getClickedAction(e)
        console.log(action)
        // const getTypeOfAction ;
        // const getTypeOfAmount ;
    }
})
const isAnAmount = (e) => {
    const amountIdWhenClickInButton = e.target.parentElement.parentElement.parentElement.parentElement.id
    const amountIdWhenClickInButtonOnIncon = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id
    const whenClickInButton = amountIdWhenClickInButton.split('-')[0] == 'amount'
    const whenClickInButtonOnIcon = amountIdWhenClickInButtonOnIncon.split('-')[0] == 'amount'
    return whenClickInButton !== whenClickInButtonOnIcon
}
const getClickedAction = (e) => {
    const amountActionWhenClickInButton = e.target
    const amountActionWhenClickInButtonOnIcon = e.target.parentElement
    if(amountActionWhenClickInButtonOnIcon.classList[0] == 'btn') {
        return amountActionWhenClickInButtonOnIcon
    }
    return amountActionWhenClickInButton
}