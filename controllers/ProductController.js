const fs = require('fs');
const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const ProductService = require('../services/ProductService');
const productService = new ProductService();
require('dotenv').config(); 


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();
const bucketName = 'sdb-s3-bucket';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Función para subir archivo a S3
const uploadFileToS3 = (file) => {
    const params = {
        Bucket: bucketName,
        Key: `${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ACL: 'public-read'
    };

    return s3.upload(params).promise();
};

// Función para obtener URL firmada de S3
const getSignedUrl = (fileName) => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Expires: 60, // Expira en 60 segundos
    };

    return s3.getSignedUrl('getObject', params);
};

// Funciones de producto
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

        if (product.PRO_IMAGEN) {
            const signedUrl = getSignedUrl(product.PRO_IMAGEN);
            product.PRO_IMAGEN_URL = signedUrl;
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
                const s3Data = await uploadFileToS3(req.file);
                productData.PRO_IMAGEN = s3Data.Key;
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
                const s3Data = await uploadFileToS3(req.file);
                productData.PRO_IMAGEN = s3Data.Key;
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
