"use strict"
export default class Categories {
    constructor() {
        this.incomeCategories = [
            {
                name: 'Work',
                HTMLIcon: '<i class="bi bi-briefcase"></i>'
            },
            {
                name: 'Others',
                HTMLIcon: '<i class="bi bi-question-circle"></i>'
            },
        ]
        this.expenseCategories = [
            {
                name: 'Hospital',
                HTMLIcon: '<i class="bi bi-hospital"></i>'
            },
            {
                name: 'Supermarket',
                HTMLIcon: '<i class="bi bi-cart2"></i>'
            },
            {
                name: 'Cafe shop',
                HTMLIcon: '<i class="bi bi-cup-hot"></i>'
            },
            {
                name: 'Others',
                HTMLIcon: '<i class="bi bi-question-circle"></i>'
            },
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