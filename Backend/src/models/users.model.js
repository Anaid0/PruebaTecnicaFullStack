const pool = require('../config/db');

// Obtener todos los usuarios
const getAllUsers = async () => {
    const [rows] = await pool.query(`
        SELECT id, name, email, created_at, updated_at
        FROM users
        ORDER BY id DESC
    `);

    return rows;
};

// Obtener un usuario por ID
const getUserById = async (id) => {
    const [rows] = await pool.query(`
        SELECT id, name, email, created_at, updated_at
        FROM users
        WHERE id = ?
    `, [id]);

    return rows[0];
};

// Buscar usuario por nombre de usuario
const getUserByname = async (name) => {
    const [rows] = await pool.query(`
        SELECT id, name, email, created_at, updated_at
        FROM users
        WHERE name = ?
    `, [name]);

    return rows[0];
};

// Crear usuario
const createUser = async (name, email, password) => {
    const [result] = await pool.query(`
        INSERT INTO users (name, email, password, created_at)
        VALUES (?, ?, ?, CURRENT_DATE)
    `, [name, email, password]);

    return result.insertId;
};

// Actualizar usuario
const updateUser = async (id, name, email, password) => {
    const [result] = await pool.query(`
        UPDATE users
        SET name = ?,
            email = ?,
            password = ?,
            updated_at = NOW()
        WHERE id = ?
    `, [name, email, password, id]);

    return result.affectedRows;
};

// Eliminar usuario
const deleteUser = async (id) => {
    const [result] = await pool.query(`
        DELETE FROM users
        WHERE id = ?
    `, [id]);

    return result.affectedRows;
};

// Buscar usuario por email
const getUserByEmail = async (email) => {
    const [rows] = await pool.query(`
        SELECT id, name, email, password, created_at, updated_at
        FROM users
        WHERE email = ?
    `, [email]);

    return rows[0] || null;
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByname,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
};