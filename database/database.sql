-- BOOKS
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT,
    publicationYear INTEGER,
    image TEXT,
    averageRating REAL DEFAULT 0, 
    description TEXT
);

-- USERS
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

-- REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    rating REAL NOT NULL,
    comment TEXT,
    dateCreated TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (bookId) REFERENCES books(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);
