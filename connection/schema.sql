CREATE TABLE IF NOT EXISTS user(
    id  VARCHAR(255) PRIMARY KEY ,
    email VARCHAR(255) NOT NULL UNIQUE,
    password  VARCHAR(255) NOT NULL 
);