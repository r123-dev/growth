const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database(':memory:');


db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)");
    db.run("INSERT INTO users (name, age) VALUES ('Alice', 30)");
    db.run("INSERT INTO users (name, age) VALUES ('Bob', 25)");
});

module.exports = db;
