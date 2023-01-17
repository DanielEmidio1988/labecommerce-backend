CREATE TABLE clientes (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE produtos (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    category BLOB
);

-- Get All Users
SELECT * FROM clientes;

-- Get All Products
SELECT * FROM produtos;

 INSERT INTO clientes (id, email, password)
    VALUES ("a001", "daniel@teste.com", "12A09"),
    ("a002", "cristiano@teste.com", "12A10"),
    ("a003","cassia@teste.com", "11B00");


-- Create Product
 INSERT INTO produtos (id, name, price, category )
    VALUES 
    ("a001", "Camiseta", 12, "Roupas e Calçados"), 
    ("a002", "Tenis de Corrida", 12, "Roupas e Calçados"),
    ("a003", "Monitor", 99, "Eletrônicos"),
    ("a004","Garrafa Térmica", 25,"Acessórios"),
    ("a005", "Mouse", 700,"Eletrônicos"), 
    ("a006", "Calça", 120, "Roupas e Calçados"),
    ("a007", "HD", 280, "Eletrônicos"),
    ("a008","Mochila", 250,"Acessórios"),
    ("a009", "Cafeteira", 80,"Eletrônicos");

-- Search Product by name
SELECT * FROM produtos 
WHERE name="Monitor";

-- Search Product by id
SELECT * FROM produtos 
WHERE id="a001";

-- Delete User by id
DELETE from clientes
WHERE id="a001";

-- Delete Product by id
DELETE from produtos
WHERE id="a001";

DELETE from clientes
WHERE id="a001";

-- Edit User by id
UPDATE clientes
SET email="monitor-chefe@teste.com"
WHERE id="a001";

-- Edit Product by id
UPDATE produtos
SET name="Monitor"
WHERE id="a001";

-- Get All Users
SELECT * FROM clientes
ORDER BY email ASC;

-- Get All Products versão 1
SELECT * FROM produtos
ORDER BY price ASC
LIMIT 20 OFFSET 0;

-- Get All Products versão 2
SELECT * FROM produtos
WHERE price >=100 AND price <=300
