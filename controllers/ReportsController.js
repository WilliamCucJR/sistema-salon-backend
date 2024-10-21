const ReportsService = require("../services/ReportsService");
const reportsService = new ReportsService();

exports.getReport = async (req, res) => {
  const {
    reportName,
    dateFrom,
    dateTo,
    stateOption,
    employeeOption,
    customerOption,
    productOption,
    selectedFormat,
  } = req.query;

  try {
    const report = await reportsService.getReport({
      reportName,
      dateFrom,
      dateTo,
      stateOption,
      employeeOption,
      customerOption,
      productOption,
      selectedFormat,
    });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
