const InvoiceService = require("../services/invoice.service");

class InvoiceController {
  // GET /staff/invoice?fromDate=&toDate=
  static async getInvoices(req, res) {
    try {
      const ChiNhanhId = req.user?.ChiNhanh?.Id; // lấy từ user đang login
      const { fromDate, toDate } = req.query;

      const invoices = await InvoiceService.getInvoices({ ChiNhanhId, fromDate, toDate });
      res.json({ success: true, data: invoices });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // GET /staff/invoice/:id
  static async getInvoiceDetail(req, res) {
    try {
      const id = req.params.id;
      const invoice = await InvoiceService.getInvoiceById(id);
      res.json({ success: true, data: invoice });
    } catch (err) {
      console.error(err);
      res.status(404).json({ success: false, message: err.message });
    }
  }
}

module.exports = InvoiceController;
