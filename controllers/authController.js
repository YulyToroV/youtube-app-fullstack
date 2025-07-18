// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Validación básica de datos de entrada
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validación de datos
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Email no válido.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe.' });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        console.log('Usuario registrado exitosamente:', username);
        res.status(201).json({ message: 'Usuario registrado correctamente.' });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validación de datos
        if (!email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Email no válido.' });
        }

        // Buscar usuario
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }

        // Generar token JWT con fallback
        const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key_12345';
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            jwtSecret,
            { expiresIn: '1h' }
        );

        console.log('Usuario logueado exitosamente:', user.username);
        res.json({ token });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
}; 