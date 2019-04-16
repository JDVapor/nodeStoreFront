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
  supervisorView();
});

function supervisorView() {
  inquirer.prompt([{
    type: 'list',
    name: 'select',
    message: 'Select an option:',
    choices: ['View Product Sales by Department', 'Create New Department']
  }]).then(function(input) {

    if (input.select === 'View Product Sales by Department') {
      deptSales();
    };

    if (input.select === 'Create New Department') {
      newDept();
    };
  });
};

function deptSales() {
  var queryStr = `SELECT departments.dept_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) as product_sales, SUM(products.product_sales) - departments.over_head_costs AS total_profit FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY departments.dept_id`;
  connection.query(queryStr, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(`DEPT ID: ${res[i].dept_id} | DEPT NAME: ${res[i].department_name}\nOVERHEAD COSTS: $${res[i].over_head_costs} | PRODUCT SALES: $${res[i].product_sales} | TOTAL PROFITS: $${res[i].total_profit}\n`);
    };
    connection.end(function(err) {
      if (err) {
        console.log(err);
      };
    });
  });
};

function newDept() {
  inquirer.prompt([{
    type: 'input',
    name: 'deptName',
    message: '\nEnter the name of the department you would like to add.'
  }]).then(function(name) {
    var newDeptName = name.deptName;
    inquirer.prompt([{
      type: 'input',
      name: 'overHeadCost',
      message: '\nEnter the overhead cost for the new department.'
    }]).then(function(cost) {
      var deptOHC = cost.overHeadCost;
      var queryStr = `INSERT INTO departments(department_name, over_head_costs)
      VALUES("${newDeptName}", ${deptOHC});`;
      connection.query(queryStr, function(err, res) {
        console.log(`ADDED NEW DEPARTMENT.`);
        connection.end(function(err) {
          if (err) {
            console.log(err);
          };
        });
      });
    });
  });
};
