"use strict"
import Account from './account.js'
import Categories from './categories.js'

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

const generateId = () => Date.now().toString(35) + Math.random().toString(36).slice(2)
const getAmountType = () => {
    const incomeBtnInAmountTypeNavigation = document.getElementById('incomeBtnInAmountTypeNavigation')
    if(incomeBtnInAmountTypeNavigation.classList[1] == 'active') {
        return 'income'
    }
    return 'expense'
}
const getCategorie = () => {
    const amountCategorieSelect = document.getElementById('amountCategorieSelect')
    const incomeBtnInAmountTypeNavigation = document.getElementById('incomeBtnInAmountTypeNavigation')
    const categorie = amountCategorieSelect.value
    if(incomeBtnInAmountTypeNavigation.classList[1] == 'active') {
        return categories.getIncomeCategorie(categorie)
    }
    return categories.getExpenseCategorie(categorie)
}
const getDate = () => new Date(Date.now()).toLocaleDateString()

const amountInput = document.getElementById('amountInput')
const commentInput = document.getElementById('commentInput')
const amountCategorieSelect = document.getElementById('amountCategorieSelect')
const addAmountSubmitInputBtn = document.getElementById('addAmountSubmitInputBtn')
addAmountSubmitInputBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if(isTheInputValid()) {
        const newAmountForRegister = {
            id: generateId(),
            amount: Number(amountInput.value),
            type: getAmountType(),
            categorie: getCategorie(),
            comment: commentInput.value,
            date: getDate()
        }
        defaultAccount.logAmount(newAmountForRegister)
        defaultAccount.showIncomes()
        defaultAccount.showAccountValues()
        cleanInputs()
        addNewAmountModal.hide()
    }
})

const isTheInputValid = () => {
    return !!amountInput.value.trim() && !!commentInput.value.trim() && amountCategorieSelect.value != 'none'
}

const cleanInputs = () => {
    amountInput.value = ''
    commentInput.value = ''
    amountCategorieSelect.value = 'none'
}

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