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
                };
                if(minBudget > budget){
                    minBudget = budget;
                };
            }
            let medBudgetCalc = totalBudget / lastMark;
            medBudget = medBudgetCalc.toFixed(2);
            resolve({maxBudget, minBudget, medBudget});
        })
    }
}
export default CalcService;