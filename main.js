"use strict"
import Account from './account.js'

const defaultAccount = new Account('default')
defaultAccount.firstInit()

const changeNewAmountModalTitle = (amountType) => {
    const newAmountModalTitle = document.getElementById('newAmountModalTitle')
    if(amountType == 'income') {
        newAmountModalTitle.innerText = 'New income'
        return true
    }

    newAmountModalTitle.innerText = 'New expense'
}

const amountTypeNavigation = document.getElementById('amountTypeNavigation')
amountTypeNavigation.addEventListener('click', e => {
    const incomeBtnInAmountTypeNavigation = document.getElementById('incomeBtnInAmountTypeNavigation')
    const expenseBtnInAmountTypeNavigation = document.getElementById('expenseBtnInAmountTypeNavigation')
    if(e.target == incomeBtnInAmountTypeNavigation && e.target.classList[1] != 'active') {
        incomeBtnInAmountTypeNavigation.classList.add('active')
        expenseBtnInAmountTypeNavigation.classList.remove('active')
        defaultAccount.showIncomes()
        changeNewAmountModalTitle('income')
    } 
    else if (e.target == expenseBtnInAmountTypeNavigation && e.target.classList[1] != 'active') {
        expenseBtnInAmountTypeNavigation.classList.add('active')
        incomeBtnInAmountTypeNavigation.classList.remove('active')
        defaultAccount.showExpenses()
        changeNewAmountModalTitle('expense')
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
const getDate = () => new Date(Date.now()).toLocaleDateString()

const amountInput = document.getElementById('amountInput')
const commentInput = document.getElementById('commentInput')
const addAmountSubmitInputBtn = document.getElementById('addAmountSubmitInputBtn')
addAmountSubmitInputBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if(isTheInputValid()) {
        const newAmountForRegister = {
            id: generateId(),
            amount: Number(amountInput.value),
            type: getAmountType(),
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
    return !!amountInput.value.trim() && !!commentInput.value.trim()
}

const cleanInputs = () => {
    amountInput.value = ''
    commentInput.value = ''
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