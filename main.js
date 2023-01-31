"use strict"
import Account from './account.js'
import Categories from './categories.js'
import NewAmountView from './newAmountView.js'

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
        const newAmount = await getNewAmount(amountId)
        defaultAccount.editAmount({ amountId, newAmount })
        editAmountModal.hide()
    } 
    else if(amountActionName == 'delete') {
        defaultAccount.deleteAmount(amountId)
    }
    defaultAccount.showIncomes()
    defaultAccount.showAccountValues()
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

const editAmountInput = document.getElementById('editAmountInput')
const editTypeSelect = document.getElementById('editAmountTypeSelect')
const editAmountCategorieSelect = document.getElementById('editAmountCategorieSelect')
const editCommentInput = document.getElementById('editCommentInput')
const editDateInput = document.getElementById('editDateInput')

const getNewAmount = (amountId) => {
    const saveChangesInAmountBtn = document.getElementById('saveChangesInAmountBtn')
    return new Promise(resolve => {
        saveChangesInAmountBtn.addEventListener('click', (e) => {
            const newAmount = {
                id: amountId,
                amount: Number(editAmountInput.value),
                type: editTypeSelect.value,
                comment: editCommentInput.value,
                date: formatDate(editDateInput.value)
            }
            if(areValidTheInputsOfNewAmount()){
                resolve(newAmount)
            }
        })
    })
}

const formatDate = (date) => {
    return date.split('-').reverse().join('/')
}

const areValidTheInputsOfNewAmount = () => {
    return !!editAmountInput.value && !!editCommentInput.value && editTypeSelect.value != 'none' && !!editDateInput.value
}