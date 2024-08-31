const CatalogueService = require('./CatalogueService');

class UserService extends CatalogueService {
    constructor() {
        super('SDB_USER', 'USE_ID');
    }
}

module.exports = UserService;