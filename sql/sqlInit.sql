DROP TABLE tokens;
DROP TABLE users;
DROP TABLE books;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  login TEXT NOT NULL,
  password TEXT NOT NULL,
  salt TEXT NOT NULL
);

CREATE TABLE tokens(
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES users(id),
  token TEXT NOT NULL 
);

CREATE TABLE books(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  author TEXT NOT NULL,
  year INTEGER NOT NULL
);

INSERT INTO users(login, password, salt)
  VALUES('Ilnur', MD5(CONCAT(MD5('password'), 'salt')), 'salt');
INSERT INTO tokens(userId, token) 
  VALUES(1, 'fb0cefc8-3fa1-4b82-9975-e5a1c9d1c45f');

INSERT INTO books(name, author, year)
  VALUES('Code Complete', 'St. Macconnell', 1980);

SELECT * FROM users;
SELECT * FROM tokens;
SELECT * FROM books;
