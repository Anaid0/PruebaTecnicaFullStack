const categoryModel = require('../models/category.model');


// GET /api/categories
const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.getAllCategories();

        res.status(200).json(categories);

    } catch (error) {
        console.error('Error al obtener categorías:', error);

        res.status(500).json({
            message: 'Error al obtener las categorías'
        });
    }
};


// GET /api/categories/:id
const getCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await categoryModel.getCategoryById(id);

        if (!category) {
            return res.status(404).json({
                message: 'Categoría no encontrada'
            });
        }

        res.status(200).json(category);

    } catch (error) {
        console.error('Error al obtener categoría:', error);

        res.status(500).json({
            message: 'Error al obtener la categoría'
        });
    }
};


// POST /api/categories
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validación
        if (!name || !name.trim()) {
            return res.status(400).json({
                message: 'El nombre de la categoría es obligatorio'
            });
        }

        // Comprobar nombre duplicado
        const existingCategory = await categoryModel.getCategoryByName(
            name.trim()
        );

        if (existingCategory) {
            return res.status(409).json({
                message: 'Ya existe una categoría con ese nombre'
            });
        }

        const categoryId = await categoryModel.createCategory(
            name.trim(),
            description
        );

        const category = await categoryModel.getCategoryById(categoryId);

        res.status(201).json({
            message: 'Categoría creada correctamente',
            category
        });

    } catch (error) {
        console.error('Error al crear categoría:', error);

        res.status(500).json({
            message: 'Error al crear la categoría'
        });
    }
};


// PUT /api/categories/:id
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        // Verificar existencia
        const category = await categoryModel.getCategoryById(id);

        if (!category) {
            return res.status(404).json({
                message: 'Categoría no encontrada'
            });
        }

        // Validar nombre
        if (!name || !name.trim()) {
            return res.status(400).json({
                message: 'El nombre de la categoría es obligatorio'
            });
        }

        // Verificar que no exista otra categoría con ese nombre
        const existingCategory = await categoryModel.getCategoryByName(
            name.trim()
        );

        if (existingCategory && existingCategory.id !== Number(id)) {
            return res.status(409).json({
                message: 'Ya existe otra categoría con ese nombre'
            });
        }

        await categoryModel.updateCategory(
            id,
            name.trim(),
            description
        );

        const updatedCategory = await categoryModel.getCategoryById(id);

        res.status(200).json({
            message: 'Categoría actualizada correctamente',
            category: updatedCategory
        });

    } catch (error) {
        console.error('Error al actualizar categoría:', error);

        res.status(500).json({
            message: 'Error al actualizar la categoría'
        });
    }
};


// DELETE /api/categories/:id
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar existencia
        const category = await categoryModel.getCategoryById(id);

        if (!category) {
            return res.status(404).json({
                message: 'Categoría no encontrada'
            });
        }

        // Verificar productos asociados
        const hasProducts = await categoryModel.hasProducts(id);

        if (hasProducts) {
            return res.status(409).json({
                message: 'No se puede eliminar la categoría porque tiene productos asociados'
            });
        }

        await categoryModel.deleteCategory(id);

        res.status(200).json({
            message: 'Categoría eliminada correctamente'
        });

    } catch (error) {
        console.error('Error al eliminar categoría:', error);

        res.status(500).json({
            message: 'Error al eliminar la categoría'
        });
    }
};


module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};