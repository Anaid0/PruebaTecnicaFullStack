const inventoryMovementsModel = require('../models/inventory_movements.model');

// GET /api/inventory_movements
const getInventoryMovements = async (req, res) => {
    try {
        const inventoryMovements = await inventoryMovementsModel.getAllInventoryMovements();    

        res.status(200).json(inventoryMovements);

    } catch (error) {
        console.error('Error al obtener movimientos de inventario:', error);

        res.status(500).json({
            message: 'Error al obtener los movimientos de inventario'
        });
    }
};

//GET /api/inventory_movements/:id
const getInventoryMovementsById = async (req, res) => {
    try {
        const { id } = req.params;  
        const inventoryMovement = await inventoryMovementsModel.getInventoryMovementById(id);

        if (!inventoryMovement) {
            return res.status(404).json({
                message: 'Movimiento de inventario no encontrado'
            });
        }

        res.status(200).json(inventoryMovement);
    } catch (error) {
        console.error('Error al obtener movimiento de inventario:', error);

        res.status(500).json({
            message: 'Error al obtener el movimiento de inventario'
        });
    }
};

//GET /api/inventory_movements/type/:type
const getInventoryMovementsByType = async (req, res) => {
    try {
        const { type } = req.params;  
        const inventoryMovements = await inventoryMovementsModel.getInventoryMovementsByType(type);
        if (!inventoryMovements) {
            return res.status(404).json({
                message: 'No se encontraron movimientos de inventario para el tipo especificado'
            });
        }
        res.status(200).json(inventoryMovements);
    }
    catch (error) {
        console.error('Error al obtener movimientos de inventario por tipo:', error);
        res.status(500).json({
            message: 'Error al obtener los movimientos de inventario por tipo'
        });
    }
};

//POST /api/inventory_movements
const createInventoryMovement = async (req, res) => {
    try {
        const { product_id, quantity, type, user_id } = req.body;

        const newInventoryMovement = await inventoryMovementsModel.createInventoryMovement({
            product_id,
            quantity,
            type,
            user_id
        });

        res.status(201).json(newInventoryMovement);
    } catch (error) {
        console.error('Error al crear movimiento de inventario:', error);

        res.status(500).json({
            message: 'Error al crear el movimiento de inventario'
        });
    }
};

//PUT /api/inventory_movements/:id
const updateInventoryMovement = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_id, quantity, type, user_id } = req.body;

        // Verificar si el movimiento de inventario existe
        const existingInventoryMovement = await inventoryMovementsModel.getInventoryMovementById(id);
        if (!existingInventoryMovement) {
            return res.status(404).json({
                message: 'Movimiento de inventario no encontrado'
            });
        }

        const updatedInventoryMovement = await inventoryMovementsModel.updateInventoryMovement(id, {
            product_id,
            quantity,
            type,
            user_id
        });

        res.status(200).json(updatedInventoryMovement);
    } catch (error) {
        console.error('Error al actualizar movimiento de inventario:', error);
        res.status(500).json({
            message: 'Error al actualizar el movimiento de inventario'
        });
    }
};

//DELETE /api/inventory_movements/:id
const deleteInventoryMovement = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el movimiento de inventario existe
        const existingInventoryMovement = await inventoryMovementsModel.getInventoryMovementById(id);  

        if (!existingInventoryMovement) {
            return res.status(404).json({
                message: 'Movimiento de inventario no encontrado'
            });
        }

        const deleted = await inventoryMovementsModel.deleteInventoryMovement(id);

        if (deleted) {
            res.status(200).json({
                message: 'Movimiento de inventario eliminado correctamente'
            });
        }
    } catch (error) {
        console.error('Error al eliminar movimiento de inventario:', error);
        res.status(500).json({
            message: 'Error al eliminar el movimiento de inventario'
        });
    }
};

module.exports = {
    getInventoryMovements,
    getInventoryMovementsByType,
    getInventoryMovementsById,
    createInventoryMovement,
    updateInventoryMovement,
    deleteInventoryMovement
};
