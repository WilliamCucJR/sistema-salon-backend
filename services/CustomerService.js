const CatalogueService = require('./CatalogueService');

class CustomerService extends CatalogueService {
    constructor() {
        super('SDB_CUSTOMER', 'CUS_ID');
    }
}

module.exports = CustomerService;