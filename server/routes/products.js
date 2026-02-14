const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Importamos el modelo que acabamos de hacer

// RUTA 1: Obtener TODAS las flores
// Cuando alguien entre a: GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Busca todo en la base de datos
    res.json(products); // Lo envía como respuesta JSON al frontend
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;