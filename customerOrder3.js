import csv from "csv-parser";
import fs from "fs";
import { totalmem } from "os";
import { parse } from "path";
const revenue = [];

fs.createReadStream("orders.csv")
  .pipe(csv())
  .on("data", (data) => revenue.push(data))
  .on("end", () => {
    //console.log(revenue);
    monthlyRevenue(revenue);
    findLostCustomers(revenue);
  });
// ## Part 3: Revenue Insights

// 1. **Calculate the total revenue generated for each month**. Your output should display the `year-month` (e.g., `2023-07`) and the corresponding `total_revenue`.

function monthlyRevenue(revenue) {
  const monthlySales = {};

  revenue.forEach((sale) => {
    let monthOfSale = sale.order_date.split("-").slice(0, 2);
    let pricePerUnit = parseFloat(sale.price_per_unit);
    let quantity = parseInt(sale.quantity);
    if (!isNaN(parseInt(monthOfSale[0])) && !isNaN(pricePerUnit) && !isNaN(quantity)) {
      let yearAndMonth = monthOfSale.join('-')
      let saleTotal = parseFloat((pricePerUnit * quantity).toFixed(2));
      if (monthlySales[monthOfSale]) {
        monthlySales[yearAndMonth] += Number(saleTotal);
      } else {
        monthlySales[yearAndMonth] = Number(saleTotal);
      }
    } else {
      // console.log([monthOfSale[0], pricePerUnit, quantity, 'one of these is not a number'])
    }
  });

  console.log(monthlySales);
}

// 2. **Identify any customers who haven't placed an order in the last 6 months** (based on the most recent order date in the dataset). List their `customer_id` and the date of their last order.

function findLostCustomers(revenue){
  let customerAndDate = [];
  let mostRecentOrderUnixTimeStamp = 0;


  revenue.forEach((sale) => {
    let dateInteger = Date.parse(sale.order_date);
    let date = sale.order_date;
    let customer = sale.customer_id;
    customerAndDate.push([dateInteger, date, customer]);
    if(dateInteger > mostRecentOrderUnixTimeStamp) {
      mostRecentOrderUnixTimeStamp = dateInteger;
    }
  })

  console.log(new Date(mostRecentOrderUnixTimeStamp));

  const sixMonthsAgo = mostRecentOrderUnixTimeStamp - 15778458000;

  const customersWhoHaveNotShoppedInSixMonths = 
  customerAndDate.filter((sale) => !isNaN(sale[0]))
  .filter((sale) => sale[2] !== 'INVALID_ID')
  .filter((sale) => sale[0] <= sixMonthsAgo)
  .sort((a, b) => b[0] - a[0])
  .map((sale) => [sale[2], sale[1]]);

  console.log(customersWhoHaveNotShoppedInSixMonths);

}