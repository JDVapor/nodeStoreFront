DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id INT AUTO_INCREMENT not null,
product_name VARCHAR(40) not null,
department_name VARCHAR(25),
price DECIMAL(10,2),
stock_qty INTEGER(8),
product_sales DECIMAL(10,2),
PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_qty, product_sales)
VALUES('Sword of Azaneth', 'Weapon', 444.44, 2, 0);

INSERT INTO products(product_name, department_name, price, stock_qty, product_sales)
VALUES("Rageclef's Ravanger", 'Weapon', 200.25, 20, 0);

INSERT INTO products(product_name, department_name, price, stock_qty, product_sales)
VALUES("Dolaz Glowing Helemt", 'Armor', 650.75, 8, 0);

INSERT INTO products(product_name, department_name, price, stock_qty, product_sales)
VALUES("Rusted Boots", 'Armor', 10.50, 200, 0);

INSERT INTO products(product_name, department_name, price, stock_qty, product_sales)
VALUES("Robes of Calcian", 'Armor', 333.33, 3, 0);

INSERT INTO products(product_name, department_name, price, stock_qty, product_sales)
VALUES("Staff of Desire", 'Weapon', 999.99, 1, 0);

INSERT INTO products(product_name, department_name, price, stock_qty, product_sales)
VALUES("Greater Healing Potion", 'Consumable', 25.00, 2000, 0);

INSERT INTO products(product_name, department_name, price, stock_qty, product_sales)
VALUES("Greater Mana Potion", 'Consumable', 50.00, 2000, 0);

INSERT INTO products(product_name, department_name, price, stock_qty, product_sales)
VALUES("Stone of Imortality", 'Item', 888.88, 5, 0);

INSERT INTO products(product_name, department_name, price, stock_qty, product_sales)
VALUES("Crux of Calcian", 'Item', 555.55, 5, 0);

INSERT INTO products(product_name, department_name, price, stock_qty, product_sales)
VALUES("Adrog's Immolating Breastplate", 'Armor', 775.75, 7, 0);

CREATE TABLE departments (
dept_id INT AUTO_INCREMENT not null,
department_name VARCHAR(40) not null,
over_head_costs DECIMAL(10,2),
PRIMARY KEY (dept_id)
);
