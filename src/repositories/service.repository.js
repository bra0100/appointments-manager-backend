import db from '../db/database.js';

export const createService = ({ name, description = "", price = 0 }) => {
    return new Promise((resolve, reject) => {
        const sql = `
        INSERT INTO services (name, description, price)
        VALUES (?, ?,?)
        `;

        db.run(sql, [name, description, price], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({
                    id: this.lastID,
                    name,
                    description,
                    price,
                    active: 1
                });
            }
        });
    });
};

export const findAllServices = () => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT * FROM SERVICES WHERE active = 1
        `
        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        }
        )
    });
};

export const getServiceById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT * FROM services WHERE id = ? AND active = 1
        `
        db.get(sql, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}