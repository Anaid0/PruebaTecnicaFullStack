const pool = require('../config/db');

// Obtener todas las categorías
const getAllCategories = async () => {
    const [rows] = await pool.query(`
        SELECT id, name, description, created_at, updated_at
        FROM categories
        ORDER BY id DESC
    `);

    return rows;
};


// Obtener una categoría por ID
const getCategoryById = async (id) => {
    const [rows] = await pool.query(`
        SELECT id, name, description, created_at, updated_at
        FROM categories
        WHERE id = ?
    `, [id]);

    return rows[0];
};


// Buscar categoría por nombre
const getCategoryByName = async (name) => {
    const [rows] = await pool.query(`
        SELECT id, name, description, created_at, updated_at
        FROM categories
        WHERE name = ?
    `, [name]);

    return rows[0];
};


// Crear categoría
const createCategory = async (name, description) => {
    const [result] = await pool.query(`
        INSERT INTO categories (name, description, created_at)
        VALUES (?, ?, CURRENT_DATE)
    `, [name, description || null]);

    return result.insertId;
};


// Actualizar categoría
const updateCategory = async (id, name, description) => {
    const [result] = await pool.query(`
        UPDATE categories
        SET name = ?,
            description = ?,
            updated_at = NOW()
        WHERE id = ?
    `, [name, description || null, id]);

    return result.affectedRows;
};


// Eliminar categoría
const deleteCategory = async (id) => {
    const [result] = await pool.query(`
        DELETE FROM categories
        WHERE id = ?
    `, [id]);

    return result.affectedRows;
};


// Verificar si tiene productos
const hasProducts = async (id) => {
    const [rows] = await pool.query(`
        SELECT COUNT(*) AS total
        FROM products
        WHERE category_id = ?
    `, [id]);

    return rows[0].total > 0;
};


module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory,
    hasProducts
};