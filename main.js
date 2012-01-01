"use strict"
import Account from './account.js'
import Categories from './categories.js'
import NewAmountView from './newAmountView.js'
import EditAmountView from './editAmountView.js'

const defaultAccount = new Account('default')
defaultAccount.firstInit()
defaultAccount.showChartIncomes()

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
            defaultAccount.showChartIncomes()
            changeNewAmountModalTitleTo('New Income')
            changeCategoriesInNewAmountModal(categories.getSelectInputContentOfIncomeCategories())
        } 
        else if (e.target.id == 'expenseBtnInAmountTypeNavigation') {
            toggleAmountTypeNavigationOptions()
            defaultAccount.showExpenses()
            defaultAccount.showChartExpenses()
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

const showChanges = () => {
    const incomeBtnInAmountTypeNavigation = document.getElementById('incomeBtnInAmountTypeNavigation')
    if(incomeBtnInAmountTypeNavigation.classList[1] == 'active') {
        defaultAccount.showIncomes()
        defaultAccount.showChartIncomes()
        return 'income' // es solo para terminar la funcion
    } 
    defaultAccount.showExpenses()
    defaultAccount.showChartExpenses()
}

const newAmountView = new NewAmountView(defaultAccount)
const addAmountSubmitInputBtn = document.getElementById('addAmountSubmitInputBtn')
addAmountSubmitInputBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const newAmount = newAmountView.getNewAmount()
    defaultAccount.logAmount(newAmount)
    showChanges()
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
        editAmountView.startDinamicChangeInEditForm()
        const editedAmount = await editAmountView.getEditedAmount(amountId)
        editAmountView.saveEditedAmount(editedAmount)
        editAmountView.finishDinimicChangeInEditForm()
        editAmountModal.hide()
        defaultAccount.showAccountValues()
    } 
    else if(amountActionName == 'delete') {
        defaultAccount.deleteAmount(amountId)
    }
    showChanges()
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