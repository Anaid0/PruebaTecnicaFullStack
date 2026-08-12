const pool = require('../config/db');

// Obtener todos los movimientos de inventario
const getAllInventoryMovements = async () => {
    const [rows] = await pool.query(`
        SELECT id, product_id, quantity, type, created_at
        FROM inventory_movements
        ORDER BY id DESC
    `);

    return rows;
};

//Obtener un movimiento de inventario por ID
const getInventoryMovementById = async (id) => {
    const [rows] = await pool.query(`
        SELECT id, product_id, quantity, type, created_at
        FROM inventory_movements
        WHERE id = ?
    `, [id]);

    return rows[0] || null;
};

//Buscar movimientos de inventario por tipo de movimiento
const getInventoryMovementsByType = async (type) => {
    const [rows] = await pool.query(`
        SELECT id, product_id, quantity, type, created_at
        FROM inventory_movements
        WHERE type = ?
    `, [type]);    

    return rows[0];
};

//Buscar movimientos de inventario por ID de producto
const getInventoryMovementsByProductId = async (product_id) => {
    const [rows] = await pool.query(`
        SELECT id, product_id, quantity, type, created_at
        FROM inventory_movements
        WHERE product_id = ?
    `, [product_id]);   

    return rows[0];
};

//Buscar movimientos por ID de usuario
const getInventoryMovementsByUserId = async (user_id) => {
    const [rows] = await pool.query(`
        SELECT id, product_id, quantity, type, created_at
        FROM inventory_movements
        WHERE user_id = ?
    `, [user_id]);  

    return rows[0];
};

//Crear un movimiento de inventario
const createInventoryMovement = async (product_id, quantity, type, user_id) => {
    const [result] = await pool.query(`
        INSERT INTO inventory_movements (product_id, quantity, type, user_id, created_at)
        VALUES (?, ?, ?, ?, CURRENT_DATE)
    `, [product_id, quantity, type, user_id]);
    
    return result.insertId;
};

//Actualizar un movimiento de inventario
const updateInventoryMovement = async (id, product_id, quantity, type, user_id) => {
    const [result] = await pool.query(` 
        UPDATE inventory_movements
        SET product_id = ?,
            quantity = ?, 
            type = ?,
            user_id = ?,
            updated_at = CURRENT_DATE
        WHERE id = ?
    `, [product_id, quantity, type, user_id, id]);

    return result.affectedRows > 0;
};

//Eliminar un movimiento de inventario
const deleteInventoryMovement = async (id) => {
    const [result] = await pool.query(`
        DELETE FROM inventory_movements
        WHERE id = ?
    `, [id]);
    
    return result.affectedRows > 0;
};

module.exports = {
    getAllInventoryMovements,
    getInventoryMovementById,
    getInventoryMovementsByType,
    getInventoryMovementsByProductId,
    getInventoryMovementsByUserId,
    createInventoryMovement,
    updateInventoryMovement,
    deleteInventoryMovement
};