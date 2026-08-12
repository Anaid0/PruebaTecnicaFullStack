const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersModel = require('../models/users.model');

const { revokeToken } = require('../middlewares/tokenBlacklist');

// POST /api/auth/register
const register = async (req, res) => {
    try {
        const { name, email, password, password_confirmation } = req.body;

        // Campos obligatorios
        if (!name || !name.trim()) {
            return res.status(400).json({
                message: 'El nombre es obligatorio'
            });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({
                message: 'El correo electrónico es obligatorio'
            });
        }

        if (!password) {
            return res.status(400).json({
                message: 'La contraseña es obligatoria'
            });
        }

        // Confirmación de contraseña
        if (password !== password_confirmation) {
            return res.status(400).json({
                message: 'Las contraseñas no coinciden'
            });
        }

        // Longitud mínima
        if (password.length < 6) {
            return res.status(400).json({
                message: 'La contraseña debe tener al menos 6 caracteres'
            });
        }

        // Validación básica del correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                message: 'El formato del correo electrónico no es válido'
            });
        }

        // Comprobar email existente
        const existingEmail = await usersModel.getUserByEmail(
            email.trim()
        );

        if (existingEmail) {
            return res.status(409).json({
                message: 'El correo electrónico ya está registrado'
            });
        }

        // Comprobar nombre existente
        const existingUser = await usersModel.getUserByname(
            name.trim()
        );

        if (existingUser) {
            return res.status(409).json({
                message: 'El nombre de usuario ya está en uso'
            });
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const userId = await usersModel.createUser(
            name.trim(),
            email.trim(),
            hashedPassword
        );

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: {
                id: userId,
                name: name.trim(),
                email: email.trim()
            }
        });

    } catch (error) {
        console.error('Error en registro:', error);

        res.status(500).json({
            message: 'Error al registrar el usuario'
        });
    }
};


// POST /api/auth/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Correo y contraseña son obligatorios'
            });
        }

        // Buscar usuario
        const user = await usersModel.getUserByEmail(
            email.trim()
        );

        if (!user) {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            });
        }

        // Comparar contraseña
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            });
        }

        // Crear token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1h'
            }
        );

        res.status(200).json({
            message: 'Login exitoso',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Error en login:', error);

        res.status(500).json({
            message: 'Error al iniciar sesión'
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await usersModel.getUserById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at
            }
        });

    } catch (error) {
        console.error('Error al obtener perfil:', error);

        res.status(500).json({
            message: 'Error al obtener el perfil'
        });
    }
};

const logout = async (req, res) => {
    try {
        revokeToken(req.token);

        res.status(200).json({
            message: 'Sesión cerrada correctamente'
        });

    } catch (error) {
        console.error('Error en logout:', error);

        res.status(500).json({
            message: 'Error al cerrar sesión'
        });
    }
};

module.exports = {
    register,
    login,
    getProfile,
    logout
};