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

export const updateService = (id, name, description, price) => {
    return new Promise((resolve, reject) => {
        const sql = `
        UPDATE services 
        SET name = COALESCE(?, name),
            description = COALESCE(?, description),
            price = COALESCE(?, price)
        WHERE id = ? AND active = 1
        `;

        db.run(sql, [name, description, price, id], function (err) {
            if (err) {
                reject(err);
            } else if (this.changes === 0) {
                reject(new Error('Service not found'));
            } else {
                resolve({
                    id: Number(id),
                    name,
                    description,
                    price
                });
            }
        });
    });
};

export const deleteService = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
        UPDATE services 
        SET active = 0
        WHERE id = ? AND active = 1
        `;

        db.run(sql, [id], function (err) {
            if (err) {
                reject(err);
            } else if (this.changes === 0) {
                reject(new Error('Service not found'));
            } else {
                resolve();
            }
        });
    });
};