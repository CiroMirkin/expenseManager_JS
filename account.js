export default class Account {
    constructor(name) {
        this.name = name
        this.allOfAmounts = []
    }
    // DAO or content DAO
    firstInit() {
        console.info(`${this.name} account init`)
        this.allOfAmounts = JSON.parse(localStorage.getItem(`total-${this.name}`)) || []
        if(!!this.allOfAmounts.length){
            this.showIncomes()
            this.showAccountValues()
        }
    }
    #saveAmounts(){
        localStorage.setItem(`total-${this.name}`, JSON.stringify(this.allOfAmounts))
    }
    // Domain
    logAmount(amount) {
        this.allOfAmounts.push(amount)
        this.#saveAmounts()
    }
    editAmount({ amountId, amountEdited }) {
        this.allOfAmounts = this.allOfAmounts.map(amount => {
            return amount.id == amountId ? {...amountEdited} : amount
        })
        this.#saveAmounts()
    }
    deleteAmount(amountId) {
        this.allOfAmounts = this.allOfAmounts.filter(amount => amount.id !== amountId)
        this.#saveAmounts()
    }
    #getIncomes() {
        return this.allOfAmounts.filter(amount => amount.type == 'income')
    }
    #getExpenses() {
        return this.allOfAmounts.filter(amount => amount.type == 'expense')
    }
    #getTotalIncome(){
        let totalIncome = 0
        const income = this.#getIncomes()
        income.forEach(amount => totalIncome += amount.amount)
        return totalIncome
    }
    #getTotalExpenses() {
        let totalExpense = 0
        const expenses = this.#getExpenses()
        expenses.forEach(amount => totalExpense += amount.amount)
        return totalExpense
    }
    #getTotalAmount(){
        return this.#getTotalIncome() - this.#getTotalExpenses()
    }
    // View
    #showListOfAmounts(list) {
        const amountListElement = document.getElementById('amountList')
        amountListElement.innerHTML = list.map(amount =>`
            <li id="${amount.id}" class="list-group-item d-flex justify-content-between align-items-start">
                <div class="d-flex align-items-center">
                <div class="py-1 px-2 d-flex justify-content-center align-items-center border border-secondary rounded">${amount.categorie.HTMLIcon}</div>
                <div class="h5 mx-2 my-0">${amount.amount}</div>
                </div>
                <div>
                    <button class="btn btn-primary" amount-action="edit"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-danger" amount-action="delete"><i class="bi bi-trash3"></i></button>
                </div>
            </li>
        ` ).join('')
    }
    showIncomes() {
        this.#showListOfAmounts(this.#getIncomes())
    }
    showExpenses() {
        this.#showListOfAmounts(this.#getExpenses())
    }
    showAccountValues(){
        const acoountValuesHTMLElement = document.getElementById('accountValues')
        acoountValuesHTMLElement.innerHTML = `<ul class="mx-3  rounded-2 border border-1 border-light-subtle border-opacity-50">
            <li><span class="fs-6 opacity-50">Total</span><div class="fs-1">${this.#getTotalAmount()}</div></li>
        </ul>`
    }
    onlyAmountAndCategorieInAmountsOf(amounts) {
        amounts = amounts.map(amount => ({
            amount: amount.amount,
            categorie: amount.categorie.name
        }))
        const simplifiedAmounts = {}
        amounts.forEach(amount => {
            if (!simplifiedAmounts[amount.categorie]) {
                simplifiedAmounts[amount.categorie] = 0;
            }
            simplifiedAmounts[amount.categorie] += amount.amount;
        })
        return simplifiedAmounts
    }
    giveFormatOfAmountsForDisplayedOnTheChart(amounts) {
        const amountsFormatted = [[], []]
        Object.entries(amounts).forEach(([categorie, amount]) => {
            amountsFormatted[0].push(categorie)
            amountsFormatted[1].push(amount)
        })
        return amountsFormatted
    }
    #showInChart(categories, valueOfCategories) {
        const ctx = document.getElementById('chart');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [...categories],
                datasets: [
                    {
                        data: [...valueOfCategories],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                    }
                ]
            },
            options: {
                plugins: {
                  customCanvasBackgroundColor: {
                    color: '#fff',
                  }
                }
            },
            plugins: [{
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart, args, options) => {
                  const {ctx} = chart;
                  ctx.save();
                  ctx.globalCompositeOperation = 'destination-over';
                  ctx.fillStyle = options.color || '#99ffff';
                  ctx.fillRect(0, 0, chart.width, chart.height);
                  ctx.restore();
                }
              }],
        });
    }
    showChartIncome() {
        const incomes = this.#getIncomes()
        const incomeListReduce = this.onlyAmountAndCategorieInAmountsOf(incomes)
        const [ categories, valueOfCategories ] = this.giveFormatOfAmountsForDisplayedOnTheChart(incomeListReduce)
        this.#showInChart(categories, valueOfCategories)
    }
}