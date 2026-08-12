const productsModel = require('../models/products.model');

// GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await productsModel.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 

// GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productsModel.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 

//POST /api/products
const createProduct = async (req, res) => {
    try {  
        const { name, description, price, stock, category_id } = req.body;

        // Validación
        if (!name || !name.trim()) {
            return res.status(400).json({
                message: 'El nombre del producto es obligatorio'
            });
        }

        const productId = await productsModel.createProduct(name, description, price, stock, category_id);
        res.status(201).json({ id: productId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 

//PUT /api/products/:id
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, category_id } = req.body; 

        // Validación existencia del producto
        const existingProduct = await productsModel.getProductById(id);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const updated = await productsModel.updateProduct(id, name, description, price, stock, category_id);
        if (updated) {
            res.json({ message: 'Producto actualizado correctamente' });
        } else {
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }   

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;     

        //Verificar existencia del producto
        const existingProduct = await productsModel.getProductById(id);

        if (!existingProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const deleted = await productsModel.deleteProduct(id);
        if (deleted) {
            res.json({ message: 'Producto eliminado correctamente' });
        } else {
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};