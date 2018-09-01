import sortBy from 'array-sort-by';
const CalcService = {
    calcPrice(data) {
        return new Promise((resolve, reject)=>{
            if(!Array.isArray(data)) {
                reject()
            }
            let maxMessagePrice = data[0].price_per_lead;
            let messagePrice = 0;
            let lastMark = data.length;
            let minMessagePrice = data[0].price_per_lead;
            let medMessagePrice = 0;
            let totalMessagePrice = 0;
            for (let i = 0; i < lastMark; i++){
                messagePrice = data[i].price_per_lead;
                totalMessagePrice = totalMessagePrice + messagePrice;
                if(maxMessagePrice < messagePrice){
                    maxMessagePrice = messagePrice;
                }
                if(minMessagePrice > messagePrice){
                    minMessagePrice = messagePrice;
                }
            }
            let medMessagePriceCalc = totalMessagePrice / lastMark;
            medMessagePrice = medMessagePriceCalc.toFixed(2);
            resolve({maxMessagePrice, minMessagePrice, medMessagePrice});
        })
    },

    calcBudget(data) {
        return new Promise((resolve, reject)=>{
            let maxBudget = data[0].monthly_budget;
            let budget = 0;
            let lastMark = data.length;
            let minBudget = data[0].monthly_budget;
            let medBudget = 0;
            let totalBudget = 0;
            for (let i = 0; i < lastMark; i++){
                budget = data[i].monthly_budget;
                totalBudget = totalBudget + budget;
                if(maxBudget < budget){
                    maxBudget = budget;
                }
                if(minBudget > budget){
                    minBudget = budget;
                }
            }
            let medBudgetCalc = totalBudget / lastMark;
            medBudget = medBudgetCalc.toFixed(2);
            resolve({maxBudget, minBudget, medBudget});
        })
    },

    calcPriceTopFive(data) {
        return new Promise((resolve, reject)=>{
            let priceMax = data[0].price_per_lead;
            let lastMark = data.length;
            let messagePrice = 0;
            let arrayOrderPrice = [];
            for (let i = 0; i < lastMark; i++){
                arrayOrderPrice.push(data[i]);
                messagePrice = data[i].price_per_lead;
                if(priceMax < messagePrice){
                    priceMax = messagePrice;
                }
            }
            sortBy(arrayOrderPrice, item => [-item.price_per_lead]);
            // Object.keys(arrayOrder).forEach(key => console.log(key, (arrayOrder[key])));

            let arrayPriceTopFive = [];
            let i = 0;
            let count = 1;
            arrayPriceTopFive.push(arrayOrderPrice[i]);
            for (i = 1; i<5 ; i++){
                let firstValue = arrayOrderPrice[count-1].sport_id;
                let nextValue = arrayOrderPrice[count].sport_id;
                if(firstValue !== nextValue){
                    arrayPriceTopFive.push(arrayOrderPrice[count]);
                    count ++;
                }
            }
            // Object.keys(arrayPriceTopFive).forEach(key => console.log(key, arrayPriceTopFive[key]));
            resolve({arrayPriceTopFive});
        })
    },

    calcBudgetTopFive(data) {
        return new Promise((resolve, reject)=>{
            let maxBudget = data[0].monthly_budget;
            let lastMark = data.length;
            let budget = 0;
            let arrayOrder = [];
            for (let i = 0; i < lastMark; i++){
                arrayOrder.push(data[i]);
                budget = data[i].monthly_budget;
                if(maxBudget < budget){
                    maxBudget = budget;
                }
            }
            sortBy(arrayOrder, item => [-item.monthly_budget]);
            // Object.keys(arrayOrder).forEach(key => console.log(key, (arrayOrder[key])));

            let arrayBudgetTopFive = [];
            let i = 0;
            let count = 1;
            arrayBudgetTopFive.push(arrayOrder[i]);
            for (i = 1; count !== 5; i++){
                let firstValue = arrayOrder[i-1].sport_id;
                let nextValue = arrayOrder[i].sport_id;
                if(firstValue !== nextValue){
                    arrayBudgetTopFive.push(arrayOrder[i]);
                    count ++;
                }
            }
            // Object.keys(arrayBudgetTopFive).forEach(key => console.log(key, arrayBudgetTopFive[key]));
            resolve({arrayBudgetTopFive});
        })
    },
};
export default CalcService;