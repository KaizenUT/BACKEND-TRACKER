const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
  origin: 'https://kaizenut.github.io/FRONTEND-TRACKER'
})); // Comunicacion entre B y F sin error en el navegador 
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error de conexión:', err));

// Importar rutas
const gamesRoutes = require('./routes/games');
const reviewsRoutes = require('./routes/reviews');

// Usar rutas
app.use('/api/game', gamesRoutes);
app.use('/api/review', reviewsRoutes);

// Ruta de prueba pa saber si funciona
app.get('/', (req, res) => {
  res.json({ mensaje: '🎮 API GameTracker funcionando correctamente' });
});

// Puerto y verificación de servidor corriendo
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});