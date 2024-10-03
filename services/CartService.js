const Database = require("../data/Database");

class CartService {
  constructor() {
    this.db = new Database();
  }
  async getById(id) {
    const sql = `SELECT 	a.ORD_ID,
                          a.ORD_IDENTIFIER,
                          a.ORD_ORDER_DATE,
                          a.CUS_ID,
                          COALESCE(a.PRO_ID, a.SER_ID) AS PRO_ID,
                          a.ORD_QUANTITY,
                          a.ORD_TOTAL,
                          a.ORD_STATUS,
                              COALESCE(p.PRO_IMAGEN, s.SER_IMAGEN) AS PRO_IMAGEN,
                              COALESCE(p.PRO_NAME, s.SER_SERVICENAME) AS PRO_NAME,
                              COALESCE(p.PRO_DESCRIPTION, s.SER_SERVICENAME) AS PRO_DESCRIPTION
                  FROM SDB_ORDER a
                  LEFT JOIN SDB_PRODUCT p ON p.PRO_ID = a.PRO_ID
                  LEFT JOIN SDB_SERVICE s ON s.SER_ID = a.SER_ID
                  WHERE a.CUS_ID = ?
                  AND a.ORD_STATUS = 0`;
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
      const result = await this.db.query(sql, values);
      if (result.length === 0 || result[0].TOTAL === null) {
        return [{ TOTAL: "0", CANTIDAD: "0" }];
      }
      return result;
    } catch (err) {
      throw new Error("Error al obtener el registro: " + err.message);
    }
  }

  async addToCart(data) {
    const sql = `INSERT INTO SDB_ORDER SET ?`;
    try {
      return await this.db.query(sql, data);
    } catch (err) {
      throw new Error("Error al crear el registro: " + err.message);
    }
  }

  async updateCart(data, id) {
    const sql = `UPDATE SDB_ORDER SET ? WHERE ORD_ID = ?`;
    try {
      return await this.db.query(sql, [data, id]);
    } catch (err) {
      throw new Error("Error al actualizar el registro: " + err.message);
    }
  }
}

module.exports = CartService;
