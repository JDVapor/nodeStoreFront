CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id INT AUTO_INCREMENT not null,
product_name VARCHAR(40) not null,
department_name VARCHAR(25),
price DECIMAL(10,2),
stock_quantity INTEGER(8)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES('Sword of Azaneth', 'Weapons', 444.44, 2); 
