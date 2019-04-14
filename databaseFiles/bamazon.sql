DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id INT AUTO_INCREMENT not null,
product_name VARCHAR(40) not null,
department_name VARCHAR(25),
price DECIMAL(10,2),
stock_qty INTEGER(8),
PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES('Sword of Azaneth', 'Weapon', 444.44, 2);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES("Rageclef's Ravanger", 'Weapon', 200.25, 20);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES("Dolaz Glowing Helemt", 'Armor', 650.75, 8);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES("Rusted Boots", 'Armor', 10.50, 200);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES("Robes of Calcian", 'Armor', 333.33, 3);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES("Staff of Desire", 'Weapon', 999.99, 1);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES("Greater Healing Potion", 'Consumable', 25.00, 2000);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES("Greater Mana Potion", 'Consumable', 50.00, 2000);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES("Stone of Imortality", 'Item', 888.88, 5);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES("Crux of Calcian", 'Item', 555.55, 5);

INSERT INTO products(product_name, department_name, price, stock_qty)
VALUES("Adrog's Immolating Breastplate", 'Armor', 775.75, 7);
