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
    getIncomeCategorie(name) {
        const categorie = this.incomeCategories.filter(incomeCategorie => incomeCategorie.name == name)
        return categorie[0]
    }
    getExpenseCategorie(name) {
        const categorie = this.expenseCategories.filter(expenseCategorie => expenseCategorie.name == name)
        return categorie[0]
    }
    getSelectInputContentOfIncomeCategories() {
        return `
            <option value="none">...</option>
            ${
                this.incomeCategories.map(incomeCategorie => {
                    return `<option value="${incomeCategorie.name}">${incomeCategorie.name}</option>`
                }).join('')
            }
        `
    } 
    getSelectInputContentOfExpenseCategories() {
        return `
            <option value="none">...</option>
            ${
                this.expenseCategories.map(expenseCategorie => {
                    return `<option value="${expenseCategorie.name}">${expenseCategorie.name}</option>`
                }).join('')
            }
        `
    } 
}