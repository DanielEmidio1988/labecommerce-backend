CREATE TABLE clients (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    category BLOB
);

-- Get All Users
SELECT * FROM clients;

-- Get All Products
SELECT * FROM products;

 INSERT INTO clients (id, email, password)
    VALUES ("u001", "daniel@teste.com", "12A09"),
    ("u002", "cristiano@teste.com", "12A10"),
    ("u003","cassia@teste.com", "11B00");


-- Create Product
 INSERT INTO products (id, name, price, category )
    VALUES 
    ("p001", "Camiseta", 12, "Roupas e Calçados"), 
    ("p002", "Tenis de Corrida", 12, "Roupas e Calçados"),
    ("p003", "Monitor", 99, "Eletrônicos"),
    ("p004","Garrafa Térmica", 25,"Acessórios"),
    ("p005", "Mouse", 700,"Eletrônicos"), 
    ("p006", "Calça", 120, "Roupas e Calçados"),
    ("p007", "HD", 280, "Eletrônicos"),
    ("p008","Mochila", 250,"Acessórios"),
    ("p009", "Cafeteira", 80,"Eletrônicos");

DELETE FROM clients;

-- Search Product by name
SELECT * FROM products
WHERE name="Monitor";

-- Search Product by id
SELECT * FROM products 
WHERE id="p001";

-- Delete User by id
DELETE from products
WHERE id="p001";

-- Delete Product by id
DELETE from products
WHERE id="p001";

DELETE from clients
WHERE id="u001";

-- Edit User by id
UPDATE clients
SET email="monitor-chefe@teste.com"
WHERE id="u001";

-- Edit Product by id
UPDATE products
SET name="Monitor"
WHERE id="p001";

-- Get All Users
SELECT * FROM clients
ORDER BY email ASC;

-- Get All Products versão 1
SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0;

-- Get All Products versão 2
SELECT * FROM products
WHERE price >=100 AND price <=300;

-- Criação da tabela de pedidos
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT, 
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES clients (id)
);

SELECT * from purchases;

INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id) 
VALUES ("pu001", 100, 1,NULL,"a001"),
("pu002", 500, 0,NULL,"a001"),
("pu003", 80, 0,NULL,"a002"),
("pu004", 250, 0,NULL,"a003");

UPDATE purchases
SET delivered_at = datetime('now')
WHERE id="pu001";

SELECT 
clients.id AS clientID,
clients.email,
clients.password,
purchases.*
FROM clients
INNER JOIN purchases
ON purchases.buyer_id = clients.id;

-- Criação da tabela de relações
CREATE TABLE purchases_products
(purchase_id TEXT NOT NULL, 
product_id TEXT NOT NULL,
quantity INTEGER NOT NULL,
FOREIGN KEY (purchase_id) REFERENCES purchases(id),
FOREIGN KEY (product_id) REFERENCES products(id));

SELECT * FROM purchases_products;

--Exercicio 2
--Popule sua tabela purchases_products simulando 3 compras de clientes.
INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES ("pu001","p001",6), 
("pu002","p008",2), 
("pu004","p009",1);

SELECT * FROM purchases_products;

-- Mostre em uma query todas as colunas das tabelas relacionadas (purchases_products, purchases e products).
SELECT 
purchases.id AS purchaseID,
products.id AS productId,
products.name AS productName,
purchases_products.quantity,
purchases.buyer_id,
purchases.total_price
FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;