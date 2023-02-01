import Categories from './categories.js'
export default class EditAmountView {
    constructor(account) {
        this.account = account
    }
    formatDate(date) {
        return date.split('-').reverse().join('/')
    }
    areValidTheInputsOfNewAmount() {
        const editAmountInput = document.getElementById('editAmountInput')
        const editTypeSelect = document.getElementById('editAmountTypeSelect')
        const editAmountCategorieSelect = document.getElementById('editAmountCategorieSelect')
        const editCommentInput = document.getElementById('editCommentInput')
        const editDateInput = document.getElementById('editDateInput')
        return !!editAmountInput.value && !!editCommentInput.value && editTypeSelect.value != 'none' && !!editDateInput.value
    }
    getCategorie() {
        const editAmountCategorieSelect = document.getElementById('editAmountCategorieSelect')
        const categorie = editAmountCategorieSelect.value
        const editTypeSelect = document.getElementById('editAmountTypeSelect')
        const categories = new Categories()
        if(editTypeSelect.value == 'income') {
            return categories.getIncomeCategorie(categorie)
        }
        return categories.getExpenseCategorie(categorie)
    }
    getEditedAmount(amountId) {
        return new Promise(resolve => {
            const saveChangesInAmountBtn = document.getElementById('saveChangesInAmountBtn')
            saveChangesInAmountBtn.addEventListener('click', (e) => {
                const editAmountInput = document.getElementById('editAmountInput')
                const editTypeSelect = document.getElementById('editAmountTypeSelect')
                const editCommentInput = document.getElementById('editCommentInput')
                const editDateInput = document.getElementById('editDateInput')
                const newAmount = {
                    id: amountId,
                    amount: Number(editAmountInput.value),
                    type: editTypeSelect.value,
                    categorie: this.getCategorie(),
                    comment: editCommentInput.value,
                    date: this.formatDate(editDateInput.value)
                }
                if(this.areValidTheInputsOfNewAmount()){
                    resolve(newAmount)
                }
            })
        })
    }
    changeContentOfCategoriesInputSelect() {
        const categories = new Categories()
        const editTypeSelect = document.getElementById('editAmountTypeSelect')
        const editAmountCategorieSelect = document.getElementById('editAmountCategorieSelect')
        if(editTypeSelect.value == 'income') {
            editAmountCategorieSelect.innerHTML = categories.getSelectInputContentOfIncomeCategories()
        } 
        else if(editTypeSelect.value == 'expense') {
            editAmountCategorieSelect.innerHTML = categories.getSelectInputContentOfExpenseCategories()
        }
    }
    startDinamicChangeInEditForm() {
        const editTypeSelect = document.getElementById('editAmountTypeSelect')
        editTypeSelect.addEventListener('change', () => this.changeContentOfCategoriesInputSelect())
    }
    finishDinimicChangeInEditForm() {
        const editTypeSelect = document.getElementById('editAmountTypeSelect')
        editTypeSelect.removeEventListener('change', () => this.changeContentOfCategoriesInputSelect())
    }
    saveEditedAmount(editedAmount) {
        this.account.editAmount({ amountId: editedAmount.id, amountEdited: editedAmount })
    }
    showChanges() {
        this.account.showIncomes()
        this.account.showAccountValues()
    }
}