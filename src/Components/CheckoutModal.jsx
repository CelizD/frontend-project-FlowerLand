import { useState } from 'react';

// Ahora recibimos 'cartItems' también
function CheckoutModal({ isOpen, onClose, total, onConfirm, cartItems }) {
  // Estados para guardar lo que escribe el usuario
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    card: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para capturar texto mientras escribes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función al dar clic en "Pagar Ahora"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que se recargue la página
    setIsSubmitting(true);

    const newOrder = {
      customerName: formData.name,
      address: formData.address,
      items: cartItems, // Enviamos las flores
      total: total
    };

    try {
      console.log("Enviando pedido...", newOrder);
      
      // 1. Intentamos enviar al Servidor
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });

      if (response.ok) {
        alert(" ¡Pedido guardado exitosamente en la Base de Datos!");
      } else {
        throw new Error("Error del servidor");
      }

    } catch (error) {
      console.warn("No se pudo conectar a la BD, guardando localmente (Simulación)");
      alert("¡Gracias por tu compra! (Modo Offline: Pedido simulado)");
    }

    setIsSubmitting(false);
    onConfirm(); // Limpia el carrito y cierra el modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Tarjeta del Modal */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">
        
        {/* Encabezado */}
        <div className="bg-[#0a0a0a] p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Finalizar compra</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            ✕
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Resumen Total */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
            <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-1">Total a pagar</p>
            <p className="text-4xl font-black text-blue-600">${total}</p>
          </div>

          {/* Inputs */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
            <input 
              required
              name="name"
              type="text" 
              placeholder="Ej. Daniel Celiz"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Dirección de Envío</label>
            <input 
              required
              name="address"
              type="text" 
              placeholder="Calle, Número, Colonia"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Tarjeta (Simulada)</label>
            <div className="relative">
              <input 
                name="card"
                type="text" 
                placeholder="0000 0000 0000 0000"
                value={formData.card}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-mono"
              />
              <svg className="w-5 h-5 text-blue-500 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
          </div>

          {/* Botón de Pago */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 transform active:scale-95 transition-all mt-4 flex justify-center items-center gap-2"
          >
            {isSubmitting ? 'Procesando...' : 'Pagar ahora'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;