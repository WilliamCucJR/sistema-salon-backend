const Database = require("../data/Database");

class LoginService {
  constructor() {
    this.db = new Database();
  }

  async login(data) {
    console.log(data);
    
    const sql = `SELECT * FROM SDB_USER WHERE USE_USER = ? AND USE_PASSWORD = ?`;
    const values = [data.USE_USER, data.USE_PASSWORD];
    try {
      return await this.db.query(sql, values);
    } catch (err) {
      throw new Error("Error al obtener el usuario: " + err.message);
    }
  }
}

module.exports = LoginService;