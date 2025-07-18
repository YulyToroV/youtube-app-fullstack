// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
module.exports = (req, res, next) => {
    // Obtener el token del header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: 'Bearer token'

    console.log('Auth Header:', authHeader);
    console.log('Token extraído:', token);

    if (!token) {
        console.log('No se proporcionó token');
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        // Verificar el token
        const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key_12345';
        const decoded = jwt.verify(token, jwtSecret);
        console.log('Token decodificado:', decoded);
        req.user = decoded; // Guardar info del usuario en la request
        next();
    } catch (error) {
        console.log('Error verificando token:', error.message);
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
}; 