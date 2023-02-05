export default class AccountView {
    showListOfAmounts(list) {
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
    showAmountTotalAccount(total) {
        const acoountValuesHTMLElement = document.getElementById('accountValues')
        acoountValuesHTMLElement.innerHTML = `<ul class="mx-3  rounded-2 border border-1 border-light-subtle border-opacity-50">
            <li><span class="fs-6 opacity-50">Total</span><div class="fs-1">${total}</div></li>
        </ul>`
    }
    showInChart(categories, valueOfCategories) {
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
}