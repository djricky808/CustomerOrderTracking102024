const csv = require("csv-parser");
const fs = require("fs");
const { totalmem } = require("os");
const { parse } = require("path");
const orders = [];

fs.createReadStream("orders.csv")
  .pipe(csv())
  .on("data", (data) => orders.push(data))
  .on("end", () => {
    console.log(orders);
    customerWithTheMostOrders();
  });

//Part 2: Order Frequency and Product Popularity
//Determine which customer placed the highest number of orders
//If there is a tie, list all the tied customers.
//Calculate the most popular product (by number of units sold);

function customerWithTheMostOrders(orders) {
    const customerData = {}

}

function theMostPopularProduct(orders) {

}