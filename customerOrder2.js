const csv = require("csv-parser");
const fs = require("fs");
const { totalmem } = require("os");
const { parse } = require("path");
const orders = [];

fs.createReadStream("orders.csv")
  .pipe(csv())
  .on("data", (data) => orders.push(data))
  .on("end", () => {
    //console.log(orders);
    //customerWithTheMostOrders(orders);
    theMostPopularProduct(orders);
  });

//Part 2: Order Frequency and Product Popularity
//Determine which customer placed the highest number of orders
//If there is a tie, list all the tied customers.
//Calculate the most popular product (by number of units sold);

function customerWithTheMostOrders(orders) {
  const customerData = {};
  orders.forEach((order) => {
    let customerID = order.customer_id;
    let quantity = order.quantity;
    if (customerData[customerID]) {
      customerData[customerID] += quantity;
    } else {
      customerData[customerID] = quantity;
    }
  });
  const customersNumberOfOrders = [];
  for (const customer in customerData) {
    customersNumberOfOrders.push([customer, customerData[customer]]);
  }

  const customersRankedByOrderQuantity = customersNumberOfOrders.sort(
    (a, b) => b[1] - a[1]
  );

  console.log(customersRankedByOrderQuantity);

  let highestPayingCustomers = [];

  for (i = 0; i < customersRankedByOrderQuantity.length; i++) {
    console.log(customersRankedByOrderQuantity[i][0]);
    // if (customersRankedByOrderQuantity[i][0] !== "INVALID_ID") {
    if (i === 0) {
      highestPayingCustomers.push(customersRankedByOrderQuantity[i]);
    } else {
      let currentQuantity = customersRankedByOrderQuantity[i][1];
      let previousQuantity = customersRankedByOrderQuantity[i - 1][1];
      if (currentQuantity === previousQuantity) {
        highestPayingCustomers.push(customersRankedByOrderQuantity[i]);
      } else {
        break;
      }
    }
    //} else {
    //    console.log('Cannot push an invalid ID')
  }

  console.log(highestPayingCustomers);
}

function theMostPopularProduct(orders) {
  const productData = {};

  orders.forEach((order) => {
    let productID = order.product_id;
    let quantity = order.quantity;
    if(productData[productID]) {
      productData[productID] += quantity;
    } else {
      productData[productID] = quantity;
    }
  })

  // console.log(productData);

  const products = []

  for (const product in productData) {
    products.push([product, productData[product]])
  }

  const sortByUnitsSold = products.sort((a,b) => b[1] - a[1])

  console.log (sortByUnitsSold.slice(0,1));

}
