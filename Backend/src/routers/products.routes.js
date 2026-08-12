const express = require('express');

const productController = require('../controllers/products.controller');

const router = express.Router();

// Listar productos
router.get('/', productController.getProducts);

// Ver un producto
router.get('/:id', productController.getProductById);

// Crear producto
router.post('/', productController.createProduct);

// Actualizar producto
router.put('/:id', productController.updateProduct);

// Eliminar producto
router.delete('/:id', productController.deleteProduct);

module.exports = router;