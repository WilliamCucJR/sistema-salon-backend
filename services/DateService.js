const CatalogueService = require('./CatalogueService');

class DateService extends CatalogueService {
    constructor() {
        super('SDB_DATE', 'DAT_ID');
    }
}

module.exports = DateService;