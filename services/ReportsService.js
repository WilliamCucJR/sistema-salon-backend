const Database = require("../data/Database");

class ReportsService {
  constructor() {
    this.db = new Database();
  }

  async getReport({
    reportName,
    dateFrom,
    dateTo,
    stateOption,
    employeeOption,
    customerOption,
    productOption,
    selectedFormat,
  }) {
    let sql = "";

    switch (reportName) {
      case "Citas":
        sql = `SELECT 	a.DAT_ID AS ID,
                        CONCAT(b.CUS_FIRST_NAME, ' ',b.CUS_LAST_NAME) AS CLIENTE,
                        CONCAT(c.EMP_FIRST_NAME, ' ',c.EMP_LAST_NAME) AS EMPLEADO,
                        DATE_FORMAT(a.DAT_START, '%d-%m-%Y %H:%i') AS 'FECHA INICIO',
                        DATE_FORMAT(a.DAT_END, '%d-%m-%Y %H:%i') AS 'FECHA FIN',
                        d.SER_SERVICENAME AS 'SERVICIO',
                        CASE 
                            WHEN a.DAT_STATUS = 0 THEN 'CANCELADA'
                            WHEN a.DAT_STATUS = 1 THEN 'AGENDADA'
                            ELSE 'FINALIZADA'
                        END AS ESTADO
                FROM SDB_DATE a
                INNER JOIN SDB_CUSTOMER b ON b.CUS_ID = a.CUS_ID
                INNER JOIN SDB_EMPLOYEE c ON c.EMP_ID = a.EMP_ID
                INNER JOIN SDB_SERVICE d ON d.SER_ID = a.SER_ID
                WHERE 1 = 1`;

        if (dateFrom) {
          sql += ` AND a.DAT_START >= '${dateFrom}'`;
        }
        if (dateTo) {
          sql += ` AND a.DAT_END <= '${dateTo}'`;
        }
        if (stateOption) {
          sql += ` AND a.DAT_STATUS = ${stateOption}`;
        }
        if (employeeOption) {
          sql += ` AND a.EMP_ID = ${employeeOption}`;
        }
        break;
      case "Ventas":
        sql = `SELECT 	a.ORD_IDENTIFIER AS 'NO ORDEN',
                        DATE_FORMAT(a.ORD_ORDER_DATE, '%d-%m-%Y') AS FECHA,
                        CONCAT(c.CUS_FIRST_NAME,' ',c.CUS_LAST_NAME) AS CLIENTE,
                        d.PRO_NAME AS PRODUCTO,
                        a.ORD_QUANTITY AS CANTIDAD,
                        a.ORD_TOTAL AS TOTAL,
                        CASE
                            WHEN a.ORD_STATUS = 1 THEN 'PAGADA'
                            ELSE 'PENDIENTE DE PAGO'
                        END AS ESTADO
                FROM SDB_ORDER a
                LEFT JOIN SDB_CUSTOMER c ON c.USE_ID = a.CUS_ID
                LEFT JOIN SDB_PRODUCT d ON d.PRO_ID = a.PRO_ID
                WHERE a.SER_ID IS NULL
                AND a.ORD_STATUS = 1`;

        if (dateFrom) {
          sql += ` AND a.ORD_ORDER_DATE >= '${dateFrom}'`;
        }
        if (dateTo) {
          sql += ` AND a.ORD_ORDER_DATE <= '${dateTo}'`;
        }
        if (customerOption) {
          sql += ` AND a.CUS_ID = ${customerOption}`;
        }
        if (productOption) {
          sql += ` AND a.PRO_ID = ${productOption}`;
        }
        break;
      case "Productos":
          sql = `SELECT d.PRO_ID AS "ID",
                        d.PRO_NAME AS "PRODUCTO", SUM(a.ORD_QUANTITY) AS "CANTIDAD VENDIDA",
                        COUNT(a.ORD_IDENTIFIER) AS "NUMERO DE ORDENES",
                        CASE
                            WHEN SUM(a.ORD_QUANTITY) IS NULL THEN 'SIN VENTAS'
                            WHEN SUM(a.ORD_QUANTITY) > 0 THEN 'VENDIDO'
                            ELSE 'NO VENDIDO'
                        END AS ESTADO
                FROM SDB_ORDER a
                INNER JOIN SDB_PRODUCT d ON d.PRO_ID = a.PRO_ID
                WHERE 1 = 1`;
      
          if (dateFrom) {
              sql += ` AND a.ORD_ORDER_DATE >= '${dateFrom}'`;
          }
          if (dateTo) {
              sql += ` AND a.ORD_ORDER_DATE <= '${dateTo}'`;
          }
          if (productOption) {
              sql += ` AND d.PRO_ID = ${productOption}`;
          }
          
      
          sql += ` GROUP BY d.PRO_ID, d.PRO_NAME`;
      
          if (stateOption == 1) {
              sql += ` HAVING SUM(a.ORD_QUANTITY) > 5 ORDER BY SUM(a.ORD_QUANTITY) DESC`;
          } else if (stateOption == 2) {
            sql += ` HAVING SUM(a.ORD_QUANTITY) < 6 ORDER BY SUM(a.ORD_QUANTITY) DESC`;
          }
          break;
      case "Servicios":
        sql = `SELECT d.SER_SERVICENAME AS 'SERVICIO', COUNT(a.SER_ID) AS 'VECES UTILIZADO'
              FROM SDB_DATE a
              INNER JOIN SDB_SERVICE d ON a.SER_ID = d.SER_ID
              WHERE 1=1`; 

        if (dateFrom && dateFrom !== "") {
          sql += ` AND a.DAT_START >= '${dateFrom}'`;
        }
        if (dateTo && dateTo !== "") {
          sql += ` AND a.DAT_END <= '${dateTo}'`;
        }

        sql += ` GROUP BY d.SER_SERVICENAME`;

        if (stateOption === "servicios-mas-demandados") {
          sql += ` ORDER BY COUNT(a.SER_ID) DESC`;
        } else if (stateOption === "servicios-menos-demandados") {
          sql += ` ORDER BY COUNT(a.SER_ID) ASC`;
        }
        sql += ` LIMIT 10`;

        break;
      case "Clientes":
          sql = `SELECT c.CUS_ID as "ID CLIENTE", 
                    CONCAT(c.CUS_FIRST_NAME, ' ', c.CUS_LAST_NAME) AS "NOMBRE", 
                    COUNT(o.CUS_ID) AS "TOTAL ORDENES"
                FROM SDB_B.SDB_CUSTOMER c
                LEFT JOIN SDB_B.SDB_ORDER o ON c.CUS_ID = o.CUS_ID
                WHERE 1 = 1`;
      
          if (dateFrom) {
            sql += ` AND o.ORD_ORDER_DATE >= '${dateFrom}'`;
          }
          if (dateTo) {
            sql += ` AND o.ORD_ORDER_DATE <= '${dateTo}'`;
          }
          if (customerOption) {
            sql += ` AND c.CUS_ID = '${customerOption}'`; 
          }
      
          sql += ` GROUP BY c.CUS_ID, c.CUS_FIRST_NAME, c.CUS_LAST_NAME `;
      
          if (stateOption == 1) {
            sql += ` HAVING COUNT(o.ORD_IDENTIFIER) > 4 ORDER BY COUNT(o.ORD_IDENTIFIER) DESC`; 
          }
          if (stateOption == 2) {
            sql += ` HAVING COUNT(o.ORD_IDENTIFIER) = 0 ORDER BY COUNT(o.ORD_IDENTIFIER) DESC`; 
          }

          break;
      

      

      // Agregar más casos según sea necesario
      default:
        throw new Error("Tipo de reporte no soportado");
    }

    try {
      return await this.db.query(sql);
    } catch (err) {
      throw new Error("Error al obtener el reporte: " + err.message);
    }
  }
}


module.exports = ReportsService;
