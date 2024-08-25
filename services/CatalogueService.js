const Database = require('../data/Database');

class CatalogueService {
    constructor(tableName, idField) {
        this.db = new Database();
        this.tableName = tableName;
        this.idField = idField;
    }

    async getAll() {
        const sql = `SELECT * FROM ${this.tableName}`;
        try {
            return await this.db.query(sql);
        } catch (err) {
            throw new Error('Error al obtener registros: ' + err.message);
        }
    }

    async getById(id) {
        const sql = `SELECT * FROM ${this.tableName} WHERE ${this.idField} = ?`;
        const values = [id];
        try {
            return await this.db.query(sql, values);
        } catch (err) {
            throw new Error('Error al obtener el registro: ' + err.message);
        }
    }

    async create(data) {
        const sql = `INSERT INTO ${this.tableName} SET ?`;
        try {
            return await this.db.query(sql, data);
        } catch (err) {
            throw new Error('Error al crear el registro: ' + err.message);
        }
    }

    async update(id, data) {
        const sql = `UPDATE ${this.tableName} SET ? WHERE ${this.idField} = ?`;
        const values = [data, id];
        try {
            return await this.db.query(sql, values);
        } catch (err) {
            throw new Error('Error al actualizar el registro: ' + err.message);
        }
    }

    async delete(id) {
        const sql = `DELETE FROM ${this.tableName} WHERE ${this.idField} = ?`;
        const values = [id];
        try {
            return await this.db.query(sql, values);
        } catch (err) {
            throw new Error('Error al eliminar el registro: ' + err.message);
        }
    }
}

module.exports = CatalogueService;