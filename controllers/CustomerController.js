const fs = require('fs');
const multer = require('multer');
const path = require('path');
const CustomerService = require('../services/CustomerService');
const customerService = new CustomerService();

const uploadDir = '../uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

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

exports.createCustomer = [
    upload.single('CUS_IMAGEN'),
    async (req, res) => {
        try {
            const customerData = req.body;
            if (req.file) {
                customerData.CUS_IMAGEN = req.file.path;
            }
            const newCustomer = await customerService.create(customerData);
            res.status(201).json(newCustomer);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];

exports.updateCustomer = [
    upload.single('CUS_IMAGEN'),
    async (req, res) => {
        try {
            const customerData = req.body;
            if (req.file) {
                customerData.CUS_IMAGEN = req.file.path;
            }
            const updatedCustomer = await customerService.update(req.params.id, customerData);
            if (!updatedCustomer) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.json({ message: 'Cliente actualizado correctamente' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];

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