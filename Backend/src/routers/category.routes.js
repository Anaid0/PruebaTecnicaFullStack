const express = require('express');

const categoryController = require('../controllers/category.controller');

const router = express.Router();

// Listar categorías
router.get('/', categoryController.getCategories);

// Ver una categoría
router.get('/:id', categoryController.getCategory);

// Crear categoría
router.post('/', categoryController.createCategory);

// Actualizar categoría
router.put('/:id', categoryController.updateCategory);

// Eliminar categoría
router.delete('/:id', categoryController.deleteCategory);


module.exports = router;