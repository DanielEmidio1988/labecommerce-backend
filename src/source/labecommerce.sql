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

SELECT * FROM clientes;

SELECT (id, email) FROM clientes WHERE email="monitor@teste.com";

SELECT * FROM produtos;

 INSERT INTO clientes (id, email, password)
    VALUES ("a003", "chefer@teste.com", "12A09");

 INSERT INTO produtos (id, name, price, category )
    VALUES ("a006", "Camiseta", 12, "Roupas"), ("a007", "Tenis de Corrida", 12, "Calçado");

DELETE from clientes
WHERE id="a001";

DELETE from produtos
WHERE id="a001";

DELETE from clientes
WHERE id="a001";

UPDATE clientes
SET email="monitor-chefe@teste.com"
WHERE id="a001";

UPDATE produtos
SET name="Monitor"
WHERE id="a001";
