var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'Bob',
  password: 'ArianaGrande123!',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };
  displayItems();
});

function displayItems() {
  var queryStr = `SELECT * FROM products`;
  connection.query(queryStr, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      var data = res[i];
      console.log(`\nProduct ID Number: ${data.id} | Name: ${data.product_name} | Type: ${data.department_name} | Cost: $${data.price} | Left in Stock: ${data.stock_qty}`);
    };

    buyProduct();

  });
};

function buyProduct() {
  inquirer.prompt([{
    type: 'input',
    name: 'purchaseID',
    message: '\nEnter the ID of the product you would like to purchase.'
  }]).then(function(id) {
    var queryStr = `SELECT * FROM products WHERE id = ${id.purchaseID}`;
    connection.query(queryStr, function(err, res) {
      inquirer.prompt([{
        type: 'input',
        name: 'amount',
        message: 'How many of this product would you like to buy?'
      }]).then(function(qty) {
        if (qty.amount <= res[0].stock_qty) {
          var queryStr = `UPDATE products SET stock_qty = ${res[0].stock_qty - qty.amount} WHERE id = ${id.purchaseID}`;
          var itemBought = res[0].product_name;
          var totalPice = qty.amount * res[0].price;
          var currentSales = res[0].product_sales;
          connection.query(queryStr, function(err, res) {
            console.log(`You bought ${qty.amount} ${itemBought} for a total of $${totalPice}!`);
            var salesUpdate = `UPDATE products SET product_sales = ${currentSales + totalPice} WHERE id = ${id.purchaseID}`;
            connection.query(salesUpdate, function(err, res) {
              connection.end(function(err) {
                if (err) {
                  console.log(err);
                };
              });
            });
          });
        } else {
          console.log(`Insufficient quantity! (Only ${res[0].stock_qty} left in stock!)`);
          buyProduct();
        };
      });
    })
  });
}
