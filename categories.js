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
}