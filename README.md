SELECT *,
    SQRT(POW(34.835 - current_location[0], 2) + POW(32.085 - current_location[1], 2)) AS distance
FROM taxis
where availability = 'busy'
ORDER BY distance
LIMIT 1;

##יצירת טבלה למשתשים

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_name VARCHAR(255) UNIQUE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    password VARCHAR(255) CHECK (LENGTH(password) >= 5),
    email VARCHAR(255) UNIQUE,
    address VARCHAR(255),
    phone_number VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);