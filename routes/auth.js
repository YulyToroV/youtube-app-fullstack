// routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Ruta para registrar usuario
router.post('/register', registerUser);

// Ruta para login de usuario
router.post('/login', loginUser);

module.exports = router; 