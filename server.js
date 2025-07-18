// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');
const axios = require('axios');

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Conexión a MongoDB (forzando IPv4)
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-ia', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error conectando a MongoDB:', err));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta protegida para búsqueda en YouTube
app.get('/api/youtube/search', authMiddleware, async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ message: 'El parámetro de búsqueda "q" es obligatorio.' });
    }
    
    // Debug: verificar que la API key se está leyendo
    console.log('YouTube API Key:', process.env.YOUTUBE_API_KEY ? 'Configurada correctamente' : 'NO ENCONTRADA');
    
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q: query,
                type: 'video',
                maxResults: 12,
                key: process.env.YOUTUBE_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error al consultar la API de YouTube:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error al consultar la API de YouTube. Verifica tu API Key.' });
    }
});

// Ruta protegida para obtener detalles del canal
app.get('/api/youtube/channel/:channelId', authMiddleware, async (req, res) => {
    const { channelId } = req.params;
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
            params: {
                part: 'snippet,statistics,brandingSettings',
                id: channelId,
                key: process.env.YOUTUBE_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener detalles del canal:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error al obtener detalles del canal.' });
    }
});

// Ruta protegida para obtener detalles del video
app.get('/api/youtube/video/:videoId', authMiddleware, async (req, res) => {
    const { videoId } = req.params;
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'snippet,statistics,contentDetails',
                id: videoId,
                key: process.env.YOUTUBE_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener detalles del video:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error al obtener detalles del video.' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
}); 