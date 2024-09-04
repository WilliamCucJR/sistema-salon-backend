const CustomerService = require('../services/CustomerService');
const customerService = new CustomerService();

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAll();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await customerService.getById(req.params.id);
        if (!customer) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCustomer = async (req, res) => {
    try {
        const newCustomer = await customerService.create(req.body);
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await customerService.update(req.params.id, req.body);
        if (!updatedCustomer) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await customerService.delete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};