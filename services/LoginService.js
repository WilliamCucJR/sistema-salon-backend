const Database = require("../data/Database");
const jwt = require("jsonwebtoken");

class LoginService {
  constructor() {
    this.db = new Database();
    this.secretKey = process.env.SECRET_KEY;
  }

  async login(data) {
    const sql = `SELECT * FROM SDB_USER WHERE USE_USER = ? AND USE_PASSWORD = ?`;
    const values = [data.USE_USER, data.USE_PASSWORD];
    try {
      const user = await this.db.query(sql, values);
      if (user.length > 0) {
        const token = jwt.sign({ id: user[0].USE_ID, username: user[0].USE_USER }, this.secretKey, {
          expiresIn: "1h",
        });
        return { token };
      } else {
        const error = new Error("Credenciales inválidas");
        error.statusCode = 401;
        throw error;
      }
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  }
}

module.exports = LoginService;