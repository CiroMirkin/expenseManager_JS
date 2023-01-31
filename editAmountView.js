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
    getEditedAmount(amountId) {
        return new Promise(resolve => {
            const saveChangesInAmountBtn = document.getElementById('saveChangesInAmountBtn')
            saveChangesInAmountBtn.addEventListener('click', (e) => {
                const editAmountInput = document.getElementById('editAmountInput')
                const editTypeSelect = document.getElementById('editAmountTypeSelect')
                const editAmountCategorieSelect = document.getElementById('editAmountCategorieSelect')
                const editCommentInput = document.getElementById('editCommentInput')
                const editDateInput = document.getElementById('editDateInput')
                const newAmount = {
                    id: amountId,
                    amount: Number(editAmountInput.value),
                    type: editTypeSelect.value,
                    comment: editCommentInput.value,
                    date: this.formatDate(editDateInput.value)
                }
                if(this.areValidTheInputsOfNewAmount()){
                    resolve(newAmount)
                }
            })
        })
    }
    saveEditedAmount(editedAmount) {
        this.account.editAmount({ amountId: editedAmount.id, newAmount: editedAmount })
    }
    showChanges() {
        this.account.showIncomes()
        this.account.showAccountValues()
    }
}