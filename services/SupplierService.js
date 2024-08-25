const CatalogueService = require('./CatalogueService');

class SupplierService extends CatalogueService {
    constructor() {
        super('SDB_SUPPLIER', 'SUP_ID');
    }
}

module.exports = SupplierService;