const expres = require("express");

const inventoryMovementsController = require("../controllers/inventory_movements.controller");

const router = expres.Router();

// Listar movimientos de inventario
router.get("/", inventoryMovementsController.getInventoryMovements);

// Ver un movimiento de inventario
router.get("/:id", inventoryMovementsController.getInventoryMovementsById);

// Buscar movimientos de inventario por tipo de movimiento  
router.get("/type/:type", inventoryMovementsController.getInventoryMovementsByType);

// Crear un movimiento de inventario
router.post("/", inventoryMovementsController.createInventoryMovement);

// Actualizar un movimiento de inventario
router.put("/:id", inventoryMovementsController.updateInventoryMovement);

// Eliminar un movimiento de inventario
router.delete("/:id", inventoryMovementsController.deleteInventoryMovement);

module.exports = router;