import React, { useState } from 'react';

function LoginModal({ isOpen, onClose, onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulamos el login guardando el nombre del usuario
    const userName = isRegistering ? formData.name : (formData.email.split('@')[0] || "Cliente");
    onLogin(userName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Fondo Oscuro */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Ventana Modal */}
      <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        
        {/* Botón Cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Encabezado */}
        <div className="pt-10 pb-6 px-8 text-center">
          <h2 className="text-2xl font-serif text-gray-900 mb-2">
            {isRegistering ? 'Crear Cuenta' : 'Bienvenido de nuevo'}
          </h2>
          <p className="text-sm text-gray-500">
            {isRegistering ? 'Completa tus datos para registrarte' : 'Ingresa a tu cuenta para continuar'}
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
          
          {isRegistering && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Nombre</label>
              <input 
                type="text" 
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition-colors"
                placeholder="Ej. Daniel Celiz"
                required
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition-colors"
              placeholder="tu@email.com"
              required
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Contraseña</label>
            <input 
              type="password" 
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition-colors"
              placeholder="••••••••"
              required
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full bg-black text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-gray-800 transition-all mt-4">
            {isRegistering ? 'Registrarme' : 'Iniciar Sesión'}
          </button>

          {/* Switch Login/Register */}
          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              {isRegistering ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'}
              <button 
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="ml-2 font-bold text-pink-600 hover:underline"
              >
                {isRegistering ? 'Inicia Sesión' : 'Regístrate'}
              </button>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default LoginModal;