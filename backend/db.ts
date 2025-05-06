import Database from "better-sqlite3";

const db = new Database(":memory:");

// Execute SQL statements from strings
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        userId INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        userFirstName TEXT,
        userLastName TEXT
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
        postId INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
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

export default db;
