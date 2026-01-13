import sqlite3 from 'sqlite3';
import { initSchema } from './schema.js';

// Use in-memory database for test environment
const isTest = process.env.NODE_ENV === 'test';
const dbPath = isTest ? ':memory:' : './src/db/database.sqlite';

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

initSchema(db);

export default db;