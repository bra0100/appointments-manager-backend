import db from '../db/database.js';

export const createClient = (name) => {
    return new Promise((resolve, reject) => {
        const sql = `
        INSERT INTO clients (name)
        VALUES (?)
        `;

        db.run(sql, [name], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({
                    id: this.lastID,
                    name,
                    active: 1
                });
            }
        });
    });
};

export const findAllClients = () => {
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM clients WHERE active = 1',
            [],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};

export const getClientById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM clients WHERE id = ? AND active = 1',
            [id],
            (err, row) => {
                if (err) reject(err);
                else resolve(row);
            }
        );
    });
};