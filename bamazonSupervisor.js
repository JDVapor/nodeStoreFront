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

function deptSales () {

};

function newDept () {

};
