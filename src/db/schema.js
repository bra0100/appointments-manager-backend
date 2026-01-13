import db from './database.js';

export const initSchema = (db) => {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        active INTEGER DEFAULT 1
    )
`)

        db.run(`CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL DEFAULT 0,
        active INTEGER DEFAULT 1
    )
`)

        db.run(`CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        clientId INTEGER NOT NULL,
        serviceId INTEGER NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        
        FOREIGN KEY (clientId) REFERENCES clients(id),
        FOREIGN KEY (serviceId) REFERENCES services(id),

        UNIQUE (serviceId, date, time),
        CHECK (status in ('pending', 'attended', 'cancelled'))
    )
`)
    })
}
