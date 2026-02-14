const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyerName: { type: String, required: true }, // Nombre del cliente
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Qué compró
      quantity: { type: Number, default: 1 } // Cuántos
    }
  ],
  totalPrice: { type: Number, required: true },
  deliveryDate: { type: Date, required: true }, // <--- AQUÍ ESTÁ LO QUE PIDE TU TARJETA
  status: { 
    type: String, 
    default: 'pendiente', // pendiente, enviado, entregado
    enum: ['pendiente', 'enviado', 'entregado']
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);