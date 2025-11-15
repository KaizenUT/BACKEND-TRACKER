const express = require('express');
const router = express.Router(); // mini - server para organizar los edpoints dami
const Game = require('../models/Game');

// GET - Obtener todos los juegos
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().sort({ fechaCreacion: -1 });
    res.json({
      success: true,
      cantidad: games.length,
      data: games
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener los juegos',
      error: error.message
    });
  }
});

// GET - Obtener un juego específico por ID
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({
        success: false,
        mensaje: 'Juego no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: game
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener el juego',
      error: error.message
    });
  }
});

// POST - Agregar un nuevo juego
router.post('/', async (req, res) => {
  try {
    const nuevoJuego = new Game(req.body);
    const juegoGuardado = await nuevoJuego.save();
    
    res.status(201).json({
      success: true,
      mensaje: 'Juego agregado exitosamente',
      data: juegoGuardado
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      mensaje: 'Error al agregar el juego',
      error: error.message
    });
  }
});

// PUT - Actualizar un juego existente
router.put('/:id', async (req, res) => {
  try {
    const juegoActualizado = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!juegoActualizado) {
      return res.status(404).json({
        success: false,
        mensaje: 'Juego no encontrado'
      });
    }
    
    res.json({
      success: true,
      mensaje: 'Juego actualizado exitosamente',
      data: juegoActualizado
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      mensaje: 'Error al actualizar el juego',
      error: error.message
    });
  }
});

// DELETE - Eliminar un juego
router.delete('/:id', async (req, res) => {
  try {
    const juegoEliminado = await Game.findByIdAndDelete(req.params.id);
    
    if (!juegoEliminado) {
      return res.status(404).json({
        success: false,
        mensaje: 'Juego no encontrado'
      });
    }
    
    res.json({
      success: true,
      mensaje: 'Juego eliminado exitosamente',
      data: juegoEliminado
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al eliminar el juego',
      error: error.message
    });
  }
});

module.exports = router;