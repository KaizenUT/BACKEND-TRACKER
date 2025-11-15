const express = require('express');
const router = express.Router(); // mini - server para organizar los edpoints dami
const Review = require('../models/Review');
const Game = require('../models/Game');

// GET - Obtener todas las reseñas
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('juegoId', 'titulo imagenPortada')
      .sort({ fechaCreacion: -1 });
    
    res.json({
      success: true,
      cantidad: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener las reseñas',
      error: error.message
    });
  }
});

// GET - Obtener reseñas de un juego específico
router.get('/juego/:juegoId', async (req, res) => {
  try {
    const reviews = await Review.find({ juegoId: req.params.juegoId })
      .sort({ fechaCreacion: -1 });
    
    res.json({
      success: true,
      cantidad: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener las reseñas del juego',
      error: error.message
    });
  }
});

// GET - Obtener una reseña específica por ID
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('juegoId', 'titulo imagenPortada');
    
    if (!review) {
      return res.status(404).json({
        success: false,
        mensaje: 'Reseña no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener la reseña',
      error: error.message
    });
  }
});

// POST - Crear una nueva reseña
router.post('/', async (req, res) => {
  try {
    // Verificar que el juego existe por si acaso
    const juegoExiste = await Game.findById(req.body.juegoId);
    if (!juegoExiste) {
      return res.status(404).json({
        success: false,
        mensaje: 'El juego especificado no existe'
      });
    }
    
    const nuevaReseña = new Review(req.body);
    const reseñaGuardada = await nuevaReseña.save();
    
    // Poblar la información del juego antes de enviar respuesta
    await reseñaGuardada.populate('juegoId', 'titulo imagenPortada');
    
    res.status(201).json({
      success: true,
      mensaje: 'Reseña creada exitosamente',
      data: reseñaGuardada
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      mensaje: 'Error al crear la reseña',
      error: error.message
    });
  }
});

// PUT - Actualizar una reseña existente
router.put('/:id', async (req, res) => {
  try {
    const reseñaActualizada = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('juegoId', 'titulo imagenPortada');
    
    if (!reseñaActualizada) {
      return res.status(404).json({
        success: false,
        mensaje: 'Reseña no encontrada'
      });
    }
    
    res.json({
      success: true,
      mensaje: 'Reseña actualizada exitosamente',
      data: reseñaActualizada
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      mensaje: 'Error al actualizar la reseña',
      error: error.message
    });
  }
});

// DELETE - Eliminar una reseña
router.delete('/:id', async (req, res) => {
  try {
    const reseñaEliminada = await Review.findByIdAndDelete(req.params.id);
    
    if (!reseñaEliminada) {
      return res.status(404).json({
        success: false,
        mensaje: 'Reseña no encontrada'
      });
    }
    
    res.json({
      success: true,
      mensaje: 'Reseña eliminada exitosamente',
      data: reseñaEliminada
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al eliminar la reseña',
      error: error.message
    });
  }
});

module.exports = router;