import db from '../db/database.js';

export const createAppointment = ({
    clientId,
    serviceId,
    date,
    time
}) => {
    return new Promise((resolve, reject) => {
        const sql = `
        INSERT INTO appointments (clientId, serviceId, date, time)
        VALUES (?, ?, ?, ?)
        `;

        db.run(sql, [clientId, serviceId, date, time], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({
                    id: this.lastID,
                    clientId,
                    serviceId,
                    date,
                    time,
                    status: 'pending'
                });
            }
        });
    });
};

export const findAppointmentById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT * FROM appointments WHERE id = ?
        `

        db.get(sql, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

export const findAllAppointments = () => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT * FROM appointments
        `;

        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

export const isAppointmentTaken = (serviceId, date, time) => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT 1
        FROM appointments
        WHERE serviceId = ? 
        AND date = ? 
        AND time = ? 
        `;

        db.get(sql, [serviceId, date, time], (err, row) => {
            if (err) reject(err);
            else resolve(!!row);
        });
    });
};

export const updateAppointment = (id, fields) => {
    const filteredFields = Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => value !== undefined)
    );

    const keys = Object.keys(filteredFields);
    if (keys.length === 0) {
        return Promise.resolve(false);
    }
    const values = Object.values(filteredFields);

    const sqlSet = keys.map(key => `${key} = ?`).join(', ');

    return new Promise((resolve, reject) => {
        const sql = `
        UPDATE appointments
        SET ${sqlSet}
        WHERE id = ?
        `;

        db.run(sql, [...values, id], function (err) {
            if (err) reject(err);
            else resolve(this.changes > 0);
        });
    });
}
