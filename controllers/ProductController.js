const ProductService = require('../services/ProductService');
const productService = new ProductService();

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const newProduct = await productService.create(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.update(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productService.delete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};