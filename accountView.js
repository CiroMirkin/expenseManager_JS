export default class AccountView {
    constructor() {
        this.chart = new Chart(document.getElementById('chart'), {
            type: 'doughnut',
            data: {
                labels: ['', ''],
                datasets: [
                    {
                        data: [0, 0],
                        backgroundColor: [
                            'rgb(54, 162, 235)',
                            'rgb(255, 99, 132)',
                            'rgb(255, 205, 86)'
                        ],
                    }
                ]
            },
            options: {
                plugins: {
                  customCanvasBackgroundColor: {
                    color: '#ffffff00',
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
        })
    }
    // View
    showIncomes(incomes) {
        const incomeListElement = document.getElementById('incomeList')
        incomeListElement.innerHTML = incomes.map(income => (
            `<li id="amount-${income.id}" class="list-group-item mb-1 border border-primary-subtle">
                <header class="d-flex justify-content-between align-items-center">${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(income.amount)}
                    <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#${income.id}amountInfo" aria-expanded="false" aria-controls="${income.id}amountInfo">
                        <i class="bi bi-info-circle"></i>
                    </button>
                </header>
                <div class="collapse" id="${income.id}amountInfo">
                    <div class="d-flex flex-column justify-content-start align-items-start">
                        <p class="mt-1 mb-2">${income.comment}</p>
                        <div class="d-block m-0">
                            <button type="button" class="btn btn-sm btn-primary" action="edit"><i class="bi bi-pencil"></i></button>
                            <button type="button" class="btn btn-sm btn-danger" action="delete"><i class="bi bi-trash3"></i></button>
                        </div>
                    </div>
                </div>
            </li>`
        )).join('')
    }
    showExpenses(expenses) {
        const expenseListElement = document.getElementById('expenseList')
        expenseListElement.innerHTML = expenses.map(expense => (
            `<li id="amount-${expense.id}" class="list-group-item mb-1 border border-danger-subtle">
                <header class="d-flex justify-content-between align-items-center">${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(-expense.amount)}
                    <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="collapse" data-bs-target="#${expense.id}amountInfo" aria-expanded="false" aria-controls="${expense.id}amountInfo">
                        <i class="bi bi-info-circle"></i>
                    </button>
                </header>
                <div class="collapse" id="${expense.id}amountInfo">
                    <div class="d-flex flex-column justify-content-start align-items-start">
                        <p class="mt-1 mb-2">${expense.comment}</p>
                        <div class="d-block m-0">
                            <button type="button" class="btn btn-sm btn-primary" action="edit"><i class="bi bi-pencil"></i></button>
                            <button type="button" class="btn btn-sm btn-danger" action="delete"><i class="bi bi-trash3"></i></button>
                        </div>
                    </div>
                </div>
            </li>`
        )).join('')
    }
    ShowEmptyIncomeList() {
        document.getElementById('incomeList').innerHTML = `<li class="list-group-item mb-1 border border-primary-subtle animate__animated animate__fadeInUp">
            <header class="d-flex justify-content-between align-items-center">There're no incomes.</header>
        </li>`
    }
    ShowEmptyExpenseList() {
        document.getElementById('expenseList').innerHTML = `<li class="list-group-item mb-1 border border-danger-subtle animate__animated animate__fadeInUp">
            <header class="d-flex justify-content-between align-items-center">There're no expenses.</header>
        </li>`
    }
    showAccountValue(value){
        document.getElementById('accountValue').innerText = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
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
    showChartTotal(totalIncomes, totalExpenses) {
        this.chart.data.datasets[0].data = [totalIncomes, totalExpenses]
        this.chart.data.labels = ['Incomes', 'Expenses']
        this.chart.update()
    }
    showChartIncomes(incomes) {
        const incomeListReduce = this.onlyAmountAndCategorieInAmountsOf(incomes)
        const [ categories, valueOfCategories ] = this.giveFormatOfAmountsForDisplayedOnTheChart(incomeListReduce)
    
    }
    showChartExpenses(expenses) {
        const expenseListReduce = this.onlyAmountAndCategorieInAmountsOf(expenses)
        const [ categories, valueOfCategories ] = this.giveFormatOfAmountsForDisplayedOnTheChart(expenseListReduce)
    
    }
}