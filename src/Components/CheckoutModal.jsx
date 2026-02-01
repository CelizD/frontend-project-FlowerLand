import { useState } from 'react';

function CheckoutModal({ isOpen, onClose, total, onConfirm }) {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    tarjeta: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulamos una espera de 2 segundos (como si procesara el banco)
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm(); // <--- Esto avisa a App.jsx que el pago pasó
      setFormData({ nombre: '', direccion: '', tarjeta: '' }); // Limpia el form
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Cabecera */}
        <div className="bg-gray-900 px-6 py-4 flex justify-between items-center text-white">
          <h3 className="text-xl font-bold">Finalizar Compra</h3>
          <button onClick={onClose} className="hover:text-red-400">✕</button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
            <p className="text-gray-600 text-sm">Total a pagar:</p>
            <p className="text-3xl font-bold text-blue-600">${total}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input 
              required
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ej. Daniel Celiz"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de Envío</label>
            <input 
              required
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Calle, Número, Colonia"
              value={formData.direccion}
              onChange={(e) => setFormData({...formData, direccion: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tarjeta (Simulada)</label>
            <div className="relative">
              <input 
                required
                type="text" 
                maxLength="16"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pl-10"
                placeholder="0000 0000 0000 0000"
                value={formData.tarjeta}
                onChange={(e) => setFormData({...formData, tarjeta: e.target.value})}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">💳</span>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isProcessing}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
              isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 active:scale-95"
            }`}
          >
            {isProcessing ? "Procesando pago..." : "Pagar Ahora"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;