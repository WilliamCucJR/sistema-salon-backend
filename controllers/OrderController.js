
const OrderService = require('../services/OrderService');
const orderService = new OrderService();


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAll();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
