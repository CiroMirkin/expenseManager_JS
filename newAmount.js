const amountInput = document.getElementById('amountInput')
const amountTypeSelect = document.getElementById('amountTypeSelect')
const commentInput = document.getElementById('commentInput')
const newAmountForm = document.getElementById('newAmountForm')
newAmountForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newAmount = {
        id: 1,
        amount: amountInput.value,
        type: amountTypeSelect.value,
        comment: commentInput.value
    } 
    cleanForm()
})
const cleanForm = () => {
    amountInput.value = ''
    amountTypeSelect.value = 'none'
    commentInput.value = ''
}