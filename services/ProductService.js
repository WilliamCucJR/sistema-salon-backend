const CatalogueService = require('./CatalogueService');

class ProductService extends CatalogueService {
    constructor() {
        super('SDB_PRODUCT', 'PRO_ID');
    }
}

module.exports = ProductService;