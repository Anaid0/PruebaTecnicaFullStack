const usersModel = require('../models/users.model');

// GET /api/users
const getUsers = async (req, res) => {
    try {
        const users = await usersModel.getAllUsers();

        res.status(200).json(users);

    } catch (error) {
        console.error('Error al obtener usuarios:', error);

        res.status(500).json({
            message: 'Error al obtener los usuarios'
        });
    }
};

// GET /api/users/:id
const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await usersModel.getUserById(id);

        if (!user) {    
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }  

        res.status(200).json(user);

    } catch (error) {
        console.error('Error al obtener usuario:', error);

        res.status(500).json({
            message: 'Error al obtener el usuario'
        });
    }
};

//POST /api/users
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validación
        if (!name || !name.trim()) {
            return res.status(400).json({
                message: 'El nombre de usuario es obligatorio'
            });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({
                message: 'El correo electrónico es obligatorio'
            });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                message: 'La contraseña es obligatoria y debe tener al menos 6 caracteres'
            });
        }   

        // Comprobar nombre de usuario duplicado
        const existingUser = await usersModel.getUserByname(name.trim());

        if (existingUser) {
            return res.status(400).json({
                message: 'El nombre de usuario ya está en uso'
            });
        }

        // Crear el nuevo usuario
        const newUser = await usersModel.createUser(name, email, password);

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al crear usuario:', error);

        res.status(500).json({
            message: 'Error al crear el usuario'
        });
    }
};

//PUT /api/users/:id
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {name, email, password } = req.body;

        // Validación
        if (!name || !name.trim()) {
            return res.status(400).json({
                message: 'El nombre de usuario es obligatorio'
            });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({
                message: 'El correo electrónico es obligatorio'
            });
        }

        // Comprobar si el usuario existe
        const existingUser = await usersModel.getUserById(id);

        if (!existingUser) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        // Comprobar nombre de usuario duplicado
        const userWithSamename = await usersModel.getUserByname(name.trim());

        if (userWithSamename && userWithSamename.id !== id) {
            return res.status(400).json({
                message: 'El nombre de usuario ya está en uso'
            });
        }

        // Actualizar el usuario
        const updatedUser = await usersModel.updateUser(id, {name, email, password });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);

        res.status(500).json({
            message: 'Error al actualizar el usuario'
        });
    }
};


//DELETE /api/users/:id
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;  

        // Comprobar si el usuario existe
        const existingUser = await usersModel.getUserById(id);

        if (!existingUser) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        // Eliminar el usuario
        await usersModel.deleteUser(id);    
        res.status(200).json({
            message: 'Usuario eliminado correctamente'
        }); 

    } catch (error) {
        console.error('Error al eliminar usuario:', error);

        res.status(500).json({
            message: 'Error al eliminar el usuario'
        });
    }   
};

module.exports = {
    getUsers,
    getUser,
    createUser, 
    updateUser,
    deleteUser
};