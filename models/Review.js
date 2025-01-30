const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  juegoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: [true, 'El ID del juego es obligatorio']
  },
  puntuacion: {
    type: Number,
    required: [true, 'La puntuación es obligatoria'],
    min: 1,
    max: 5
  },
  textoReseña: {
    type: String,
    required: [true, 'El texto de la reseña es obligatorio'],
    minlength: [10, 'La reseña debe tener al menos 10 caracteres'],
    maxlength: [2000, 'La reseña no puede exceder 2000 caracteres']
  },
  horasJugadas: {
    type: Number,
    required: [true, 'Las horas jugadas son obligatorias'],
    min: 0
  },
  dificultad: {
    type: String,
    required: [true, 'La dificultad es obligatoria'],
    enum: ['Fácil', 'Normal', 'Difícil', 'Muy Difícil']
  },
  recomendaria: {
    type: Boolean,
    required: [true, 'Debes indicar si recomendarías el juego'],
    default: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

// Actualizar fecha de modificación antes de guardar
reviewSchema.pre('findOneAndUpdate', function(next) {
  this.set({ fechaActualizacion: Date.now() });
  next();
});

module.exports = mongoose.model('Review', reviewSchema);