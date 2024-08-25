const CatalogueService = require('./CatalogueService');

class EmployeeService extends CatalogueService {
    constructor() {
        super('SDB_EMPLOYEE', 'EMP_ID');
    }
}

module.exports = EmployeeService;