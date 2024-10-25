drop database if exists "books_donations";

CREATE DATABASE "books_donations";

CREATE SCHEMA "dev";
SET search_path TO "dev";

CREATE TYPE STATE AS ENUM('PENDIENTE','COMPLETADA','FALLIDA');

CREATE TABLE dev.books
(
    id            SERIAL PRIMARY KEY,
    title         VARCHAR(255) NOT NULL,
    author        VARCHAR(150) NOT NULL,
    isbn          VARCHAR(13)  UNIQUE,
    total_samples INT          NOT NULL DEFAULT 0,
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by    VARCHAR(255) DEFAULT 'SYSTEM' NOT NULL,
    updated_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_by    VARCHAR(255)
);

CREATE TABLE dev.donation_requests
(
    id            SERIAL PRIMARY KEY,
    book_id       INT REFERENCES dev.books (id),
    request_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    state         STATE     DEFAULT 'PENDIENTE'       NOT NULL,
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by    VARCHAR(255) DEFAULT 'SYSTEM' NOT NULL,
    updated_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_by    VARCHAR(255)
);

CREATE TABLE dev.users
(
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(255)        NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by    VARCHAR(255) DEFAULT 'SYSTEM' NOT NULL,
    updated_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_by    VARCHAR(255)
);

CREATE TABLE dev.warehouse
(
    id             SERIAL PRIMARY KEY,
    book_id        INT REFERENCES dev.books(id),
    quantity       INT NOT NULL DEFAULT 5,
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by    VARCHAR(255) DEFAULT 'SYSTEM' NOT NULL,
    updated_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_by    VARCHAR(255)
);

CREATE TABLE dev.editorial_orders
(
    id             SERIAL PRIMARY KEY,
    book_id        INT REFERENCES dev.books(id),
    quantity       INT NOT NULL,
    request_date   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reception_date TIMESTAMP, -- ToDo: check if this field would be needed
    state          STATE DEFAULT 'PENDIENTE',
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by    VARCHAR(255) DEFAULT 'SYSTEM' NOT NULL,
    updated_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_by    VARCHAR(255),
    CONSTRAINT fk_editorial_orders_books FOREIGN KEY (book_id) REFERENCES dev.books(id)
);