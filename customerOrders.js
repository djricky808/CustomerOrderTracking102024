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
    findTop5Spenders(orders);
  });

//Part 1: Total Expenditure Per Customer
//Return the top 5 customers that spend the most money. Display their customer ID and the Total Spent.
function findTop5Spenders(orders) {
  const customerData = {};
  orders.forEach((order) => {
    let id = order.customer_id; //Customer ID
    let pricePerUnit = order.price_per_unit ? parseFloat(order.price_per_unit) : 0;
    //Handles price as 0 if the price_per_unit was undefined.
    let quantity = parseInt(order.quantity);
    let totalPrice = pricePerUnit * quantity;
    if (customerData[id]) { //If the customer ID is already in the customer data object add onto the accumulated price
        customerData[id] += totalPrice;
    } else { //Otherwise create the customer ID in the object and initiate the price value.
        customerData[id] = totalPrice;
    }
  });
  console.log(customerData);

  const totalMoneyCustomerSpent = [];
  //Convert the customer data object into nested arrays [customerId, customer's total spending]
  for (const customer in customerData){
    totalMoneyCustomerSpent.push(([customer, customerData[customer]]))
  }

  console.log(totalMoneyCustomerSpent);
  
  //sort the array of how much each customer spent, and return the top 5 customers.
  const top5spendingCustomers = totalMoneyCustomerSpent.sort((a, b) => {
    return b[1] - a[1]
  }).slice(0,5);

  console.log(top5spendingCustomers);

  /* Big-O-Notation 
  Time Complexity:
  O(n) to setup the customerData object
  O(n) to setup the totalMoneyCustomerSpent array. Assuming worst case that each custID could be unique
  top5SpendingCustomers = O(n log n);

  Space Complexity:
  Customer data O(n)
  O(n) for the totalMoneyCustomerSpent array. Assuming worst case that each custID could be unique.
  top5SpendingCustomer = 5 = O(1)
  */
}

