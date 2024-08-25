const SupplierService = require('../services/SupplierService');
const supplierService = new SupplierService();

exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierService.getAll();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await supplierService.getById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createSupplier = async (req, res) => {
    try {
        const newSupplier = await supplierService.create(req.body);
        res.status(201).json(newSupplier);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSupplier = async (req, res) => {
    try {
        const updatedSupplier = await supplierService.update(req.params.id, req.body);
        if (!updatedSupplier) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.json({ message: 'Proveedor actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteSupplier = async (req, res) => {
    try {
        const deletedSupplier = await supplierService.delete(req.params.id);
        if (!deletedSupplier) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.json({ message: 'Proveedor eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};