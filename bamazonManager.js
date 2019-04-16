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
  managerView();
});

function managerView() {
  inquirer.prompt([{
    type: 'list',
    name: 'select',
    message: 'Select an option:',
    choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
  }]).then(function(input) {

    if (input.select === 'View Products for Sale') {
      productsForSale();
    };

    if (input.select === 'View Low Inventory') {
      lowInv();
    };

    if (input.select === 'Add to Inventory') {
      addInv();
    };

    if (input.select === 'Add New Product') {
      addProduct();
    };
  });
};

function productsForSale() {
  var queryStr = `SELECT * FROM products`;
  connection.query(queryStr, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      var data = res[i];
      console.log(`\nProduct ID Number: ${data.id} | Name: ${data.product_name} | Type: ${data.department_name} | Cost: $${data.price} | Left in Stock: ${data.stock_qty}`);
    };
    connection.end(function(err) {
      if (err) {
        console.log(err);
      };
    });
  });
};

function lowInv() {
  var queryStr = `SELECT * FROM products WHERE stock_qty < 5`;
  connection.query(queryStr, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      var data = res[i];
      console.log(`\nProduct ID Number: ${data.id} | Name: ${data.product_name} | Type: ${data.department_name} | Cost: $${data.price} | Left in Stock: ${data.stock_qty}`);
    };
    connection.end(function(err) {
      if (err) {
        console.log(err);
      };
    });
  });
};

function addInv() {
  inquirer.prompt([{
    type: 'input',
    name: 'add',
    message: '\nEnter the ID of the product you would like to add inventory for.'
  }]).then(function(id) {
    var queryStr = `SELECT * FROM products WHERE id = ${id.add}`;
    connection.query(queryStr, function(err, res) {
      inquirer.prompt([{
        type: 'input',
        name: 'amount',
        message: 'How much inventory would you like to add?'
      }]).then(function(qty) {
        var currentStock = parseFloat(res[0].stock_qty);
        var amtAdded = parseFloat(qty.amount);

        var queryStr = `UPDATE products SET stock_qty = ${currentStock + amtAdded} WHERE id = ${id.add}`;
        var itemAdded = res[0].product_name;
        connection.query(queryStr, function(err, res) {
          console.log(`You added ${qty.amount} to the ${itemAdded} inventory.`);
          connection.end(function(err) {
            if (err) {
              console.log(err);
            };
          });
        });
      });
    });
  });
};

function addProduct() {
  inquirer.prompt([{
    type: 'input',
    name: 'productName',
    message: '\nEnter the name of the product you would like to add to the store.'
  }]).then(function(name) {
    var newProductName = name.productName;
    inquirer.prompt([{
      type: 'input',
      name: 'productDept',
      message: '\nEnter the department of the product you would like to add to the store.'
    }]).then(function(dept) {
      var newProductDept = dept.productDept;
      inquirer.prompt([{
        type: 'input',
        name: 'productPrice',
        message: '\nEnter the price of the product you would like to add to the store.'
      }]).then(function(price) {
        var newProductPrice = price.productPrice;
        inquirer.prompt([{
          type: 'input',
          name: 'productQty',
          message: '\nEnter the quantity of the product you would like to add to the store.'
        }]).then(function(qty) {
          var newProductQty = qty.productQty;

          var queryStr = `INSERT INTO products(product_name, department_name, price, stock_qty)
          VALUES("${newProductName}", "${newProductDept}", ${newProductPrice}, ${newProductQty});`;
          connection.query(queryStr, function(err, res) {
            console.log(`ADDED PRODUCT TO STORE`);
            connection.end(function(err) {
              if (err) {
                console.log(err);
              };
            });
          });
        });
      });
    });
  });
};
