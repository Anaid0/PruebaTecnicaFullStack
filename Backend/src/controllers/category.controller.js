const categoryModel = require('../models/category.model');

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

module.exports = {
    getCategories
};