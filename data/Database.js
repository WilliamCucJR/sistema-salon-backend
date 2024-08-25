require('dotenv').config();
const res = require("express/lib/response");
const mysql = require('mysql2');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        this.connection.connect((err) => {
            if (err) {
                console.log('Error de conexión a la base de datos:', err);
                return;
            }
            console.log('Conexión establecida con la base de datos');
        });
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        })
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

module.exports = Database;