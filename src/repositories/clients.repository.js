import db from '../db/database.js';

export const createClient = (name, email, phone) => {
    return new Promise((resolve, reject) => {
        const sql = `
        INSERT INTO clients (name, email, phone)
        VALUES (?, ?, ?)
        `;

        db.run(sql, [name, email, phone], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({
                    id: this.lastID,
                    name,
                    email,
                    phone,
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

export const updateClient = (id, name, email, phone) => {
    return new Promise((resolve, reject) => {
        const sql = `
        UPDATE clients 
        SET name = COALESCE(?, name),
            email = COALESCE(?, email),
            phone = COALESCE(?, phone)
        WHERE id = ? AND active = 1
        `;

        db.run(sql, [name, email, phone, id], function (err) {
            if (err) {
                reject(err);
            } else if (this.changes === 0) {
                reject(new Error('Client not found'));
            } else {
                resolve({
                    id: Number(id),
                    name,
                    email,
                    phone
                });
            }
        });
    });
};

export const deleteClient = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
        UPDATE clients 
        SET active = 0
        WHERE id = ? AND active = 1
        `;

        db.run(sql, [id], function (err) {
            if (err) {
                reject(err);
            } else if (this.changes === 0) {
                reject(new Error('Client not found'));
            } else {
                resolve();
            }
        });
    });
};