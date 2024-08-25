const Database = require('../data/Database');

class SupplierService {
    constructor() {
        this.db = new Database();
    }

    async getSuppliers() {
        const sql = 'SELECT * FROM SDB_SUPPLIER';
        try {
            const suppliers = await this.db.query(sql);
            return suppliers;
        } catch (err) {
            throw new Error('Error al obtener registros' + err.message);
        }
    }
}

module.exports = SupplierService;