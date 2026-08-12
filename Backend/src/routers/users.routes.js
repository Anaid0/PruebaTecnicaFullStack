const express = require('express');

const userController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();    

router.use(authMiddleware);

// Listar usuarios
router.get('/', userController.getUsers);

// Ver un usuario
router.get('/:id', userController.getUser);

// Crear usuario
router.post('/', userController.createUser);  

// Actualizar usuario
router.put('/:id', userController.updateUser); 

// Eliminar usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;