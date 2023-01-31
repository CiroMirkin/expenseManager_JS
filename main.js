"use strict"
import Account from './account.js'
import Categories from './categories.js'
import NewAmountView from './newAmountView.js'
import EditAmountView from './editAmountView.js'

const defaultAccount = new Account('default')
defaultAccount.firstInit()

const changeNewAmountModalTitleTo = (newTitle) => {
    const newAmountModalTitle = document.getElementById('newAmountModalTitle')
    newAmountModalTitle.innerText = newTitle
}

const toggleAmountTypeNavigationOptions = () => {
    const incomeBtnInAmountTypeNavigation = document.getElementById('incomeBtnInAmountTypeNavigation')
    const expenseBtnInAmountTypeNavigation = document.getElementById('expenseBtnInAmountTypeNavigation')
    incomeBtnInAmountTypeNavigation.classList.toggle('active')
    expenseBtnInAmountTypeNavigation.classList.toggle('active')
}

const changeCategoriesInNewAmountModal = (categories) => {
    const amountCategorieSelect = document.getElementById('amountCategorieSelect')
    amountCategorieSelect.innerHTML = categories
}

const categories = new Categories()
changeCategoriesInNewAmountModal(categories.getSelectInputContentOfIncomeCategories())

const amountTypeNavigation = document.getElementById('amountTypeNavigation')
amountTypeNavigation.addEventListener('click', (e) => {
    if(e.target.classList[1] != 'active') {
       if(e.target.id == 'incomeBtnInAmountTypeNavigation') {
            toggleAmountTypeNavigationOptions()
            defaultAccount.showIncomes()
            changeNewAmountModalTitleTo('New Income')
            changeCategoriesInNewAmountModal(categories.getSelectInputContentOfIncomeCategories())
        } 
        else if (e.target.id == 'expenseBtnInAmountTypeNavigation') {
            toggleAmountTypeNavigationOptions()
            defaultAccount.showExpenses()
            changeNewAmountModalTitleTo('New expense')
            changeCategoriesInNewAmountModal(categories.getSelectInputContentOfExpenseCategories())
        } 
    }
}) 

const openModalForAddNewAmount = document.getElementById('openModalForAddNewAmount')
const addNewAmountModal = new bootstrap.Modal(document.getElementById('newAmountModal'), {
    keyboard: false
})

openModalForAddNewAmount.addEventListener('click', () => {
    addNewAmountModal.show()
})

const newAmountView = new NewAmountView(defaultAccount)
const addAmountSubmitInputBtn = document.getElementById('addAmountSubmitInputBtn')
addAmountSubmitInputBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const newAmount = newAmountView.getNewAmount()
    newAmountView.saveNewAmount(newAmount)
    newAmountView.showChanges()
    newAmountView.cleanInputs()
    addNewAmountModal.hide()
})

const editAmountModal = new bootstrap.Modal(document.getElementById('editAmountModal'), {
    keyboard: false
})
const amountListHTMLElement = document.getElementById('amountList')
amountListHTMLElement.addEventListener('click', async (e) => {
    const amountActionName = getAmountActionName(e)
    const amountId = getAmountId(e)
    if(amountActionName == 'edit') {
        editAmountModal.show()
        const editAmountView = new EditAmountView(defaultAccount)
        const editedAmount = await editAmountView.getEditedAmount(amountId)
        console.log(editedAmount)
        editAmountView.saveEditedAmount(editedAmount)
        editAmountView.showChanges()
        editAmountModal.hide()
    } 
    else if(amountActionName == 'delete') {
        defaultAccount.deleteAmount(amountId)
        defaultAccount.showIncomes()
        defaultAccount.showAccountValues()
    }
})

const getAmountActionName = (e) => {
    try {
        const amountActionNameWhenTheClickIsOnBtn = e.target.attributes["amount-action"].value
        return amountActionNameWhenTheClickIsOnBtn
    } catch {
        const amountActionNameWhenTheClickIsOnIconOfBtn = e.target.parentElement.attributes["amount-action"].value
        return amountActionNameWhenTheClickIsOnIconOfBtn
    }
}

const getAmountId = (e) => {
    const amountIdWhenTheClickInOnBtn = e.target.parentElement.parentElement.id
    if(!amountIdWhenTheClickInOnBtn) {
        const amountIdWhenTheClickInOnIconOfBtn = e.target.parentElement.parentElement.parentElement.id
        return amountIdWhenTheClickInOnIconOfBtn
    }
    return amountIdWhenTheClickInOnBtn
}