const csv = require("csv-parser");
const fs = require("fs");
const { parse } = require("path");
const orders = [];

fs.createReadStream("orders.csv")
  .pipe(csv())
  .on("data", (data) => orders.push(data))
  .on("end", () => {
    console.log(orders);
    findTop5Spenders(orders);
  });

//Part 1: Total Expenditure Per Customer
//Return the top 5 customers that spend the most money. Display their customer ID and the Total Spent.
function findTop5Spenders(orders) {
  const customerData = {};
  //console.log(parseFloat(orders[0].price_per_unit));
  orders.forEach((order) => {
    let id = order.customer_id;
    let pricePerUnit = order.price_per_unit ? parseFloat(order.price_per_unit) : 0;
    let quantity = parseInt(order.quantity);
    let totalPrice = pricePerUnit * quantity;
    console.log(order.price_per_unit);
    console.log(pricePerUnit);
    if (customerData[id]) {
        customerData[id] += totalPrice;
    } else {
        customerData[id] = totalPrice;
    }
  });
  //console.log(customerData);
}

