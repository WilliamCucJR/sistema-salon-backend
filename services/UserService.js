const CatalogueService = require("./CatalogueService");
const Database = require("../data/Database");
const crypto = require("crypto");

class UserService extends CatalogueService {
  constructor() {
    super("SDB_USER", "USE_ID");
    this.db = new Database();
  }

  async addUser(customer) {
    try {
      const firstLetter = customer.CUS_FIRST_NAME.charAt(0).toUpperCase();
      const lastName = customer.CUS_LAST_NAME.toLowerCase();
      const randomDigits = Math.floor(100 + Math.random() * 900);
      const useUser = `${firstLetter}${lastName}${randomDigits}`;
      const usePassword = crypto.randomBytes(5).toString("hex");
      const userData = {
        USE_USER: useUser,
        USE_EMAIL: customer.CUS_EMAIL,
        USE_PASSWORD: usePassword,
        USE_TYPE_USER: 1,
      };

      const sql = `INSERT INTO ${this.tableName} (USE_USER, USE_EMAIL, USE_PASSWORD, USE_TYPE_USER) VALUES (?, ?, ?, ?)`;

      const result = await this.db.query(sql, [
        userData.USE_USER,
        userData.USE_EMAIL,
        userData.USE_PASSWORD,
        userData.USE_TYPE_USER,
      ]);

      console.log("Usuario agregado exitosamente:", result);
      return result;
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      throw error;
    }
  }
}

module.exports = UserService;
