// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  img: { 
    type: String, 
    required: true 
  }, // Usamos 'img' para que sea fácil de escribir
  description: { 
    type: String 
  },
  care: { 
    type: String // Instrucciones de cuidado (ej: "Riego semanal")
  },
  stock: {
    type: Number,
    default: 0, // Por defecto empieza en 0
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);