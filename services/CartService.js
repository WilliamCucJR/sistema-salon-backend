const Database = require("../data/Database");

class CartService {
  constructor() {
    this.db = new Database();
  }
  async getById(id) {
    const sql = `SELECT a.*, b.PRO_IMAGEN, b.PRO_NAME, b.PRO_DESCRIPTION FROM SDB_ORDER a INNER JOIN SDB_PRODUCT b ON b.PRO_ID = a.PRO_ID WHERE a.CUS_ID = ?`;
    const values = [id];
    try {
      return await this.db.query(sql, values);
    } catch (err) {
      throw new Error("Error al obtener el registro: " + err.message);
    }
  }

  async getTotalByCustomerId(id) {
    const sql = `SELECT SUM(ORD_TOTAL) AS TOTAL, SUM(ORD_QUANTITY) AS CANTIDAD FROM SDB_ORDER WHERE CUS_ID = ? AND ORD_STATUS = 0`;
    const values = [id];
    try {
      return await this.db.query(sql, values);
    } catch (err) {
      throw new Error("Error al obtener el registro: " + err.message);
    }
  }

  async addToCart(data) {
      const sql = `INSERT INTO SDB_ORDER SET ?`;
      try {
          return await this.db.query(sql, data);
      } catch (err) {
          throw new Error('Error al crear el registro: ' + err.message);
      }
  }
}

module.exports = CartService;
