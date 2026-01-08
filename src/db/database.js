import sqlite3 from 'sqlite3';
import { initSchema } from './schema.js';

const db = new sqlite3.Database('./src/db/database.sqlite', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

initSchema(db);

export default db;