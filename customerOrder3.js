const csv = require("csv-parser");
const fs = require("fs");
const { totalmem } = require("os");
const { parse } = require("path");
const revenue = [];

fs.createReadStream("orders.csv")
  .pipe(csv())
  .on("data", (data) => revenue.push(data))
  .on("end", () => {
    console.log(revenue);
    monthlyRevenue(revenue);
  });
// ## Part 3: Revenue Insights

// 1. **Calculate the total revenue generated for each month**. Your output should display the `year-month` (e.g., `2023-07`) and the corresponding `total_revenue`.

// 2. **Identify any customers who haven't placed an order in the last 6 months** (based on the most recent order date in the dataset). List their `customer_id` and the date of their last order.

function monthlyRevenue(revenue) {
  const monthlySales = {};

  revenue.forEach((sale) => {
    let monthOfSale = sale.order_date.split("-").slice(0, 2);
    let pricePerUnit = parseFloat(sale.price_per_unit);
    let quantity = parseInt(sale.quantity);
    //console.log(monthOfSale);
    if (!isNaN(parseInt(monthOfSale[0])) && !isNaN(pricePerUnit) && !isNaN(quantity)) {
      let yearAndMonth = monthOfSale.join('-')
      let saleTotal = parseFloat((pricePerUnit * quantity).toFixed(2));
      if (monthOfSale) {
        console.log([yearAndMonth, saleTotal])
        monthlySales[yearAndMonth] += Number(saleTotal);
      } else {
        console.log([yearAndMonth, saleTotal]);
        monthlySales[yearAndMonth] = Number(saleTotal);
      }
    } else {
      // console.log([monthOfSale[0], pricePerUnit, quantity, 'one of these is not a number'])
    }
  });

  console.log(monthlySales);
}
