import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, X } from 'lucide-react'; // Importamos iconos reales

function LoginModal({ isOpen, onClose, onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de acceso: admin@flowerland.com activa el panel de administrador
    const userName = formData.email === 'admin@flowerland.com' ? 'admin' : (formData.name || formData.email.split('@')[0]);
    onLogin(userName);
    onClose();
  };

  const handleSocialLogin = (provider) => {
    onLogin(`User_${provider}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-in-up p-8">
        
        {/* Botón Cerrar con Icono Lucide */}
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isRegistering ? 'Crea una cuenta' : 'Iniciar sesión'}
          </h2>
          <p className="text-gray-500 text-sm">Ecosistema Digital FlowerLand</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div className="relative">
              <User className="absolute left-4 top-4 text-gray-400" size={20} />
              <input 
                type="text" placeholder="Nombre completo"
                className="w-full border border-gray-100 rounded-2xl px-12 py-4 focus:outline-none focus:border-pink-500 transition-all bg-gray-50"
                required
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
            <input 
              type="email" placeholder="Correo electrónico"
              className="w-full border border-gray-100 rounded-2xl px-12 py-4 focus:outline-none focus:border-pink-500 transition-all bg-gray-50"
              required
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Contraseña"
              className="w-full border border-gray-100 rounded-2xl px-12 py-4 focus:outline-none focus:border-pink-500 transition-all bg-gray-50"
              required
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-400 hover:text-pink-500 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="w-full bg-[#d81b60] text-white font-bold py-4 rounded-full hover:bg-[#ad1457] transition-all shadow-lg mt-2">
            {isRegistering ? 'Registrarme ahora' : 'Ingresar'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <span className="relative bg-white px-4 text-gray-400 text-xs font-bold uppercase tracking-widest">o continuar con</span>
        </div>

        <div className="space-y-3">
          <button onClick={() => handleSocialLogin('Google')} className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3.5 rounded-full hover:bg-gray-50 transition-all font-medium text-gray-700">
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="G" />
            Google
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handleSocialLogin('Facebook')} className="flex items-center justify-center gap-2 bg-[#1877f2] text-white py-3.5 rounded-full hover:bg-[#166fe5] transition-all text-sm font-medium">
              Facebook
            </button>
            <button onClick={() => handleSocialLogin('Apple')} className="flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-full hover:bg-gray-800 transition-all text-sm font-medium">
              Apple
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-gray-500">
          {isRegistering ? '¿Ya tienes cuenta?' : '¿Nuevo en FlowerLand?'} 
          <button onClick={() => setIsRegistering(!isRegistering)} className="ml-1 text-pink-600 font-bold hover:underline">
            {isRegistering ? 'Inicia sesión' : 'Crea una cuenta'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;