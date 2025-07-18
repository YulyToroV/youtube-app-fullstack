# 🎵 YouTube Search App - Fullstack

Una aplicación fullstack para buscar y reproducir videos de YouTube, desarrollada con React, Node.js, MongoDB y la API de YouTube Data v3.

## 🚀 Características

- **Autenticación de usuarios** con JWT
- **Búsqueda de videos** en tiempo real
- **Reproductor embebido** de YouTube
- **Interfaz estilo YouTube** con diseño profesional
- **Base de datos MongoDB** para usuarios
- **API segura** con middleware de autenticación

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **bcryptjs** - Encriptación de contraseñas
- **Axios** - Cliente HTTP

### Frontend
- **React** - Librería de UI
- **TypeScript** - Tipado estático
- **CSS** - Estilos personalizados
- **Axios** - Cliente HTTP

### APIs Externas
- **YouTube Data API v3** - Búsqueda y datos de videos

## 📋 Prerrequisitos

- Node.js (v14 o superior)
- MongoDB (local o Atlas)
- API Key de Google Cloud (YouTube Data API v3)

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/youtube-app-fullstack.git
cd youtube-app-fullstack
```

### 2. Instalar dependencias del backend
```bash
npm install
```

### 3. Instalar dependencias del frontend
```bash
cd frontend
npm install
cd ..
```

### 4. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto:
```env
YOUTUBE_API_KEY=tu_api_key_de_youtube
MONGODB_URI=mongodb://127.0.0.1:27017/youtube-app
JWT_SECRET=tu_jwt_secret_aqui
PORT=5000
```

### 5. Iniciar MongoDB
```bash
# En Windows (si está instalado como servicio)
net start MongoDB

# O usar MongoDB Compass para conexión local
```

## 🚀 Ejecución

### Iniciar el backend
```bash
npm start
```

### Iniciar el frontend (en otra terminal)
```bash
cd frontend
npm start
```

La aplicación estará disponible en:
- **Frontend**: http://localhost:3001
- **Backend**: http://localhost:5000

## 📖 Uso

1. **Registro/Login**: Crear cuenta o iniciar sesión
2. **Búsqueda**: Buscar videos por término
3. **Reproducción**: Hacer clic en cualquier video para reproducir
4. **Navegación**: Cerrar reproductor y buscar más videos

## 🔗 Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### YouTube (Protegidas)
- `GET /api/youtube/search?q=término` - Buscar videos
- `GET /api/youtube/channel/:channelId` - Detalles del canal
- `GET /api/youtube/video/:videoId` - Detalles del video

## 🗂️ Estructura del Proyecto

```
youtube-app-fullstack/
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.tsx
│   │   │   └── YouTubeSearch.tsx
│   │   ├── App.tsx
│   │   └── index.tsx
│   └── package.json
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt
- Autenticación JWT con expiración
- Middleware de verificación de tokens
- Variables de entorno para datos sensibles

## 🎯 Funcionalidades Destacadas

- **Autenticación completa** con registro y login
- **Búsqueda en tiempo real** con la API de YouTube
- **Reproductor modal** con autoplay
- **Interfaz responsive** estilo YouTube
- **Manejo de errores** y validaciones
- **Tokens JWT** con expiración automática

## 📱 Capturas de Pantalla

### Página de Login
![Login](screenshots/login.png)

### Búsqueda de Videos
![Search](screenshots/search.png)

### Reproductor de Video
![Player](screenshots/player.png)

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

## 🙏 Agradecimientos

- YouTube Data API v3 por proporcionar los datos de videos
- MongoDB por la base de datos
- React y Node.js por las tecnologías base 