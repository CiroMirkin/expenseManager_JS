import Categories from './categories.js'

export default class NewAmountView {
    constructor(account) {
        this.account = account
    }
    #generateId () {
        return Date.now().toString(35) + Math.random().toString(36).slice(2)
    }
    #getAmountType () {
        const incomeBtnInAmountTypeNavigation = document.getElementById('incomeBtnInAmountTypeNavigation')
        if(incomeBtnInAmountTypeNavigation.classList[1] == 'active') {
            return 'income'
        }
        return 'expense'
    }
    #getCategorie () {
        const categories = new Categories()
        const amountCategorieSelect = document.getElementById('amountCategorieSelect')
        const categorie = amountCategorieSelect.value
        const incomeBtnInAmountTypeNavigation = document.getElementById('incomeBtnInAmountTypeNavigation')
        if(incomeBtnInAmountTypeNavigation.classList[1] == 'active') {
            return categories.getIncomeCategorie(categorie)
        }
        return categories.getExpenseCategorie(categorie)
    }
    #getDate() {
        return new Date(Date.now()).toLocaleDateString()
    }
    #isTheInputValid() {
        const amountInput = document.getElementById('amountInput')
        const commentInput = document.getElementById('commentInput')
        const amountCategorieSelect = document.getElementById('amountCategorieSelect')
        return !!amountInput.value.trim() && !!commentInput.value.trim() && amountCategorieSelect.value != 'none'
    }
    cleanInputs() {
        const amountInput = document.getElementById('amountInput')
        const commentInput = document.getElementById('commentInput')
        const amountCategorieSelect = document.getElementById('amountCategorieSelect')
        amountInput.value = ''
        commentInput.value = ''
        amountCategorieSelect.value = 'none'
    }
    getNewAmount() {
    const amountInput = document.getElementById('amountInput')
    const commentInput = document.getElementById('commentInput')
        if(this.#isTheInputValid()) {
            return {
                id: this.#generateId(),
                amount: Number(amountInput.value),
                type: this.#getAmountType(),
                categorie: this.#getCategorie(),
                comment: commentInput.value,
                date: this.#getDate()
            }
        }
    }
}