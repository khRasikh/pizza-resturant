DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS extras;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS menus;


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(160) NOT NULL,
    description TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);


CREATE TABLE menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(160) NOT NULL,
    category VARCHAR(160) NOT NULL,
    shift VARCHAR(160) NOT NULL,
    description TEXT,
    extra JSONB,
    price NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(16) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_date TIMESTAMP
);
ALTER TABLE menu
ALTER COLUMN currency SET DEFAULT 'EUR';


CREATE TABLE extra (
    extra_id SERIAL PRIMARY KEY,
    id INTEGER NOT NULL,
    name VARCHAR(160) NOT NULL,
    description TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (id) REFERENCES menu(id)
);


CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    address VARCHAR(160),
    home_number VARCHAR(20),
    street_name VARCHAR(100),
    postal_code VARCHAR(16),
    phone_number VARCHAR(24),
    description VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);
ALTER TABLE customer DROP COLUMN address


CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    id INTEGER NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (id) REFERENCES customer(id)
);


/** TEST DATA */
INSERT INTO users (username, email, password_hash, created_at, updated_at)
VALUES
    ('khudadad', 'kh.rasikh542@gmail.com', 'password_hash_1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('secureapp.me', 'secureapp.me@gmail.com', 'password_hash_2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('test', 'test@gmail.com', 'password_hash_3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('admin', 'admin@gmail.com', 'password_hash_4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO category (name, description, created_date, updated_date)
VALUES
    ('Pizza Stazione', 'Authentic Neapolitan-style pizzas made with fresh ingredients.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('La Pizzeria Italiana', 'Classic Italian pizzeria offering a variety of traditional pizzas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Munich Pizza Company', 'Local pizzeria specializing in wood-fired oven pizzas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Bavarian Pizza Kitchen', 'Pizzeria blending Bavarian flavors with classic pizza styles.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Pizza Alpino', 'Cozy Alpine-themed pizzeria serving gourmet pizza creations.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Pizzeria Romantica', 'Romantic Italian restaurant known for its romantic ambiance and pizzas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Mama Mia Pizzeria', 'Family-friendly pizzeria offering a variety of pizza choices.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Italiano Express', 'Quick-service Italian eatery specializing in delicious pizzas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Pizza Paradiso', 'Traditional pizzeria with a wide selection of pizza flavors.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Pomodoro Pizzeria', 'Pizzeria using fresh, handpicked tomatoes for its authentic pizzas.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO menu (name, category, shift, description, extra, price, currency, created_date, updated_date, deleted_date)
VALUES
    ('Margherita', 'Pizza', 'Lunch', 'Classic pizza with tomato sauce, mozzarella, and basil.', NULL, 8.99, 'EUR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
    ('Pepperoni', 'Pizza', 'Dinner', 'Pizza topped with spicy pepperoni and cheese.', NULL, 10.50, 'EUR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
    ('Capricciosa', 'Pizza', 'Dinner', 'Pizza topped with ham, mushrooms, artichokes, and olives.', NULL, 11.25, 'EUR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
    ('Quattro Formaggi', 'Pizza', 'Lunch', 'Pizza topped with four types of cheese.', NULL, 9.75, 'EUR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
    ('Funghi', 'Pizza', 'Dinner', 'Pizza topped with mushrooms and cheese.', NULL, 9.00, 'EUR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
    ('Prosciutto e Funghi', 'Pizza', 'Lunch', 'Pizza with ham, mushrooms, and cheese.', NULL, 10.75, 'EUR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
    ('Caprese', 'Pizza', 'Dinner', 'Pizza with tomatoes, mozzarella, basil, and olive oil.', NULL, 11.50, 'EUR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
    ('Calzone', 'Pizza', 'Dinner', 'Folded pizza filled with ham, ricotta, and mozzarella.', NULL, 12.25, 'EUR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
    ('Hawaiian', 'Pizza', 'Lunch', 'Pizza topped with ham, pineapple, and cheese.', NULL, 10.25, 'EUR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
    ('Vegetariana', 'Pizza', 'Dinner', 'Pizza with assorted fresh vegetables and cheese.', NULL, 11.00, 'EUR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

INSERT INTO extra (id, name, description, created_date, updated_date)
VALUES
    (1, 'Garlic Bread', 'Toasted bread with garlic butter and herbs.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'Caesar Salad', 'Fresh romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Mozzarella Sticks', 'Fried breaded mozzarella cheese sticks served with marinara sauce.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'Buffalo Wings', 'Spicy chicken wings served with ranch or blue cheese dressing.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 'Bruschetta', 'Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 'Onion Rings', 'Deep-fried battered onion rings served with dipping sauce.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 'Cheese Garlic Knots', 'Soft baked bread knots with garlic and melted cheese.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 'Spinach Dip', 'Creamy spinach dip served with tortilla chips or breadsticks.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 'Fried Calamari', 'Crispy fried calamari rings served with marinara sauce.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 'Veggie Platter', 'Assorted fresh vegetables served with dipping sauce.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO customer (first_name, last_name, address, home_number, street_name, postal_code, phone_number, description, created_date, updated_date)
VALUES
    ('Sophia', 'Müller', 'Munich Address 1', '12', 'Bavaria Strasse', '80331', '00491234567', 'Regular customer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Lukas', 'Schmidt', 'Munich Address 2', '24', 'Bavarian Weg', '80335', '00492345678', 'Monthly subscriber', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Elena', 'Fischer', 'Munich Address 3', '36', 'Bavarian Platz', '80336', '00493456789', 'Occasional visitor', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Jonas', 'Weber', 'Munich Address 4', '48', 'Bavaria Allee', '80337', '00494567890', 'Preferred diner', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Laura', 'Wagner', 'Munich Address 5', '60', 'Bavarian Ring', '80339', '00495678901', 'Regular customer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('David', 'Hofmann', 'Munich Address 6', '72', 'Bavarian Platz', '80331', '00496789012', 'Monthly subscriber', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Emma', 'Klein', 'Munich Address 7', '84', 'Bavaria Strasse', '80335', '00497890123', 'Occasional visitor', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Felix', 'Schneider', 'Munich Address 8', '96', 'Bavarian Weg', '80336', '00498901234', 'Preferred diner', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Sophie', 'Mayer', 'Munich Address 9', '108', 'Bavaria Allee', '80337', '00499012345', 'Regular customer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Julian', 'Herrmann', 'Munich Address 10', '120', 'Bavarian Ring', '80339', '00490123456', 'Monthly subscriber', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO orders (user_id, id, order_date, total_amount, status)
VALUES
    (1, 1, CURRENT_TIMESTAMP, 25.50, 'Pending'),
    (1, 2, CURRENT_TIMESTAMP, 30.75, 'Processing'),
    (1, 3, CURRENT_TIMESTAMP, 18.00, 'Shipped'),
    (1, 4, CURRENT_TIMESTAMP, 22.90, 'Delivered'),
    (1, 5, CURRENT_TIMESTAMP, 14.25, 'Pending'),
    (1, 6, CURRENT_TIMESTAMP, 27.80, 'Processing'),
    (1, 7, CURRENT_TIMESTAMP, 19.99, 'Shipped'),
    (1, 8, CURRENT_TIMESTAMP, 35.60, 'Delivered'),
    (1, 9, CURRENT_TIMESTAMP, 21.75, 'Pending'),
    (1, 10, CURRENT_TIMESTAMP, 29.00, 'Processing');
