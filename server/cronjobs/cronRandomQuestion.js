const cronRandomQuestion = require("node-cron")

cronRandomQuestion.schedule("* * * * * *", function() {
    Stock.findAll()
    .then(stocks=>{
        stocks.forEach(element => {
            return stock_history.create({
                stockId: element.id,
                buy: stock_history.generateRandomPrice(),
                sell: stock_history.generateRandomPrice()               
            }, {stockId: element.id})
        });
    })
    .then()
    .catch()
});

module.exports = cronRandomQuestion
