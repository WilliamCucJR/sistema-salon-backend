const CatalogueService = require('./CatalogueService');

class ProductService extends CatalogueService {
    constructor() {
        super('SDB_ORDER', 'ORD_ID');
    }
}

module.exports = ProductService;