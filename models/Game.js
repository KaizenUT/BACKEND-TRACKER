const mongoose = require('mongoose');
// Base del proyecto
const gameSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },
  genero: {
    type: String,
    required: [true, 'El género es obligatorio'],
    enum: ['Acción', 'Aventura', 'RPG', 'Estrategia', 'Deportes', 'Simulación', 'Terror', 'Puzzle', 'Carreras', 'Otro']
  },
  plataforma: {
    type: String,
    required: [true, 'La plataforma es obligatoria'],
    enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile', 'Múltiple']
  },
  añoLanzamiento: {
    type: Number,
    required: [true, 'El año de lanzamiento es obligatorio'],
    min: 1970,
    max: new Date().getFullYear() + 2
  },
  desarrollador: {
    type: String,
    required: [true, 'El desarrollador es obligatorio'],
    trim: true
  },
  imagenPortada: {
    type: String,
    default: 'https://via.placeholder.com/300x400?text=Sin+Portada'
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
  },
  completado: {
    type: Boolean,
    default: false
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', gameSchema);