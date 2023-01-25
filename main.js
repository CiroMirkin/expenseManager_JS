"use strict"
import Account from './account.js'

const generateId = () => Date.now().toString(35) + Math.random().toString(36).slice(2)

const addAmountSubmitInputBtn = document.getElementById('addAmountSubmitInputBtn')
const amountInput = document.getElementById('amountInput')
const amountTypeSelect = document.getElementById('amountTypeSelect')
const commentInput = document.getElementById('commentInput')
const amountListHTMLElement = document.getElementById('amountList')
const editAmountModal = new bootstrap.Modal(document.getElementById('editAmountModal'), {
    keyboard: false
})
const defaultAccount = new Account('default')
defaultAccount.firstInit()

addAmountSubmitInputBtn.addEventListener('click', e => {
    e.preventDefault()
    if(isTheInputValid()) {
        const newAmountForRegister = {
            id: generateId(),
            amount: Number(amountInput.value),
            type: amountTypeSelect.value,
            comment: commentInput.value,
            date: new Date(Date.now()).toLocaleDateString()
        }
        defaultAccount.logAmount(newAmountForRegister)
        defaultAccount.showAllAmounts()
        defaultAccount.showAccountValues()
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

amountListHTMLElement.addEventListener('click', async (e) => {
    const amountActionName = e.target.attributes["amount-action"].value
    const amountId = e.target.parentElement.parentElement.id
    if(amountActionName == 'edit') {
        editAmountModal.show()
        const newAmount = await getNewAmount(amountId)
        defaultAccount.editAmount({ amountId, newAmount })
        editAmountModal.hide()
    } 
    else if(amountActionName == 'delete') {
        defaultAccount.deleteAmount(amountId)
    }
    defaultAccount.showAllAmounts()
    defaultAccount.showAccountValues()
})

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