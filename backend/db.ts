import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(":memory:");

// Execute SQL statements from strings
db.exec(`
    CREATE TABLE users (
        userId INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        userFirstName TEXT,
        userLastName TEXT
    )
    `);

db.exec(`
    CREATE TABLE posts (
        postId INTEGERY PRIMARY KEY AUTOINCREMENT,
        userId INGEGER,
        postName TEXT,
        postContent TEXT,
        videoContent BLOB,
        imageContent BLOB,
        postDate DATE,
        createdDate DATE,
        status TEXT,
        FOREIGN KEY (userId) references users(userId)
    )
    `);

db.exec(`
    INSERT into users (username, password, userFirstName, userLastName) VALUES (
    "samuelj1323",
    "password123",
    "Sam",
    "Mahan"
    )
    `);

export default db;
