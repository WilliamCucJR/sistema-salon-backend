const CatalogueService = require("./CatalogueService");

class ServService extends CatalogueService {
  constructor() {
    super("SDB_SERVICE", "SER_ID");
  }
}

module.exports = ServService;
