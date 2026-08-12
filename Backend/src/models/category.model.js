const pool = require('../config/db');

const getAllCategories = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM categories'
    );

    return rows;
};

module.exports = {
    getAllCategories
};