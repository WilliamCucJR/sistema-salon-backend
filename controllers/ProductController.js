const fs = require('fs');
const multer = require('multer');
const path = require('path');
const ProductService = require('../services/ProductService');
const productService = new ProductService();

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

exports.createProduct = [
    upload.single('PRO_IMAGEN'),
    async (req, res) => {
        try {
            const productData = req.body;
            if (req.file) {
                productData.PRO_IMAGEN = req.file.path;
            }
            const newProduct = await productService.create(productData);
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];

exports.updateProduct = [
    upload.single('PRO_IMAGEN'),
    async (req, res) => {
        try {
            const productData = req.body;
            if (req.file) {
                productData.PRO_IMAGEN = req.file.path;
            }
            const updatedProduct = await productService.update(req.params.id, productData);
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            res.json({ message: 'Producto actualizado correctamente' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
];

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