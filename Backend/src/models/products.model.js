const pool = require('../config/db');

// Obtener todos los productos
const getAllProducts = async () => {
    const [rows] = await pool.query(`
        SELECT id, name, description, price, stock, category_id, created_at, updated_at
        FROM products
        ORDER BY id DESC
    `);

    return rows;
};

// Obtener un producto por ID
const getProductById = async (id) => {
    const [rows] = await pool.query(`
        SELECT id, name, description, price, stock, category_id, created_at, updated_at
        FROM products
        WHERE id = ?
    `, [id]);
    
    return rows[0];
};

// Buscar producto por nombre
const getProductByName = async (name) => {
    const [rows] = await pool.query(`
        SELECT id, name, description, price, stock, category_id, created_at, updated_at
        FROM products
        WHERE name = ?
    `, [name]);

    return rows[0];
};

//Crear producto
const createProduct = async (name, description, price, stock, category_id) => {
    const [result] = await pool.query(`
        INSERT INTO products (name, description, price, stock, category_id, created_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_DATE)
    `, [name, description || null, price || 0, stock || 0, category_id || null]);

    return result.insertId;
};

//Actualizar producto
const updateProduct = async (id, name, description, price, stock, category_id) => {
    const [result] = await pool.query(`
        UPDATE products
        SET name = ?,
            description = ?,
            price = ?,
            stock = ?,
            category_id = ?,
            updated_at = CURRENT_DATE
        WHERE id = ?
    `, [name, description || null, price || 0, stock || 0, category_id || null, id]);

    return result.affectedRows > 0;
};

//Eliminar producto
const deleteProduct = async (id) => {
    const [result] = await pool.query(`
        DELETE FROM products
        WHERE id = ?
    `, [id]);
    
    return result.affectedRows > 0;
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct
};