"use strict"
export default class Categories {
    constructor() {
        this.incomeCategories = [
            {
                name: 'Hospital',
                HTMLIcon: ''
            }
        ]
        this.expenseCategories = [

        ]
    }
    getSelectInputOfIncomeCategories() {
        return `
            <select id="amountCategorieSelect" class="form-select mb-2">
            <option value="none">...</option>
            ${
                this.incomeCategories.map(incomeCategorie => {
                    return `<option value="${incomeCategorie.name}">${incomeCategorie.name}</option>`
                }).join('')
            }
            </select>
        `
    } 
    getSelectInputOfExpenseCategories() {
        return `
            <select id="amountCategorieSelect" class="form-select mb-2">
            <option value="none">...</option>
            ${
                this.expenseCategories.map(expenseCategorie => {
                    return `<option value="${expenseCategorie.name}">${expenseCategorie.name}</option>`
                }).join('')
            }
            </select>
        `
    } 
}