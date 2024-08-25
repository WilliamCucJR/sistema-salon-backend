const SupplierService = require('../services/SupplierService');

class SupplierController {
    constructor() {
        this.supplierService = new SupplierService();
    }

    async getSuppliers(req, res) {
        try {
            const suppliers = await this.supplierService.getSuppliers();
            res.json(suppliers);
        }catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}

module.exports = SupplierController;