import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* SECCIÓN PRINCIPAL DE COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Columna 1: Ayuda e información */}
          <div>
            <h3 className="font-serif text-xl mb-6 text-gray-900">Ayuda e información</h3>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><Link to="/cobertura" className="hover:text-pink-600 transition-colors">Cobertura en Tijuana</Link></li>
              <li><Link to="/como-comprar" className="hover:text-pink-600 transition-colors">¿Cómo comprar?</Link></li>
              <li><Link to="/envios" className="hover:text-pink-600 transition-colors">Política de envíos</Link></li>
              <li><Link to="/agendar-recordatorio" className="hover:text-pink-600 transition-colors">Agendar recordatorio</Link></li>
              <li><Link to="/preguntas-frecuentes" className="hover:text-pink-600 transition-colors">Preguntas frecuentes</Link></li>
            </ul>
          </div>

          {/* Columna 2: Acerca de nosotros */}
          <div>
            <h3 className="font-serif text-xl mb-6 text-gray-900">Acerca de nosotros</h3>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><Link to="/historia" className="hover:text-pink-600 transition-colors">Nuestra Historia</Link></li>
              <li><Link to="/garantia" className="hover:text-pink-600 transition-colors">Garantía de calidad</Link></li>
              <li><Link to="/blog" className="hover:text-pink-600 transition-colors">Blog de Flores</Link></li>
              <li><Link to="/opiniones" className="hover:text-pink-600 transition-colors">Opiniones de clientes</Link></li>
            </ul>
          </div>

          {/* Columna 3: Contáctanos */}
          <div>
            <h3 className="font-serif text-xl mb-6 text-gray-900">Contáctanos</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-pink-50 transition-colors">
                <span className="text-gray-900">f</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-pink-50 transition-colors">
                <span className="text-gray-900">w</span>
              </a>
            </div>
            <p className="text-sm text-gray-500">¿Dudas? Escríbenos al WhatsApp</p>
          </div>

          {/* Columna 4: Métodos de pago */}
          <div>
            <h3 className="font-serif text-xl mb-6 text-gray-900">Métodos de pago</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="border border-gray-100 p-2 text-[10px] text-center italic text-blue-800 rounded">Visa</div>
              <div className="border border-gray-100 p-2 text-[10px] text-center italic text-red-600 rounded">Mastercard</div>
              <div className="border border-gray-100 p-2 text-[10px] text-center italic text-blue-400 rounded">Amex</div>
              <div className="border border-gray-100 p-2 text-[10px] text-center italic text-blue-900 font-bold rounded">PayPal</div>
              <div className="border border-gray-100 p-2 text-[10px] text-center font-bold text-orange-500 rounded">OXXO</div>
            </div>
            <div className="border border-gray-100 p-1 text-[9px] text-center text-gray-400 uppercase tracking-widest rounded w-20">SSL Seguro</div>
          </div>
        </div>

        {/* BARRA INFERIOR DE COPYRIGHT */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">Copyright © 2024 FlowerShop Tijuana. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link to="/privacidad" className="text-xs text-gray-400 hover:text-gray-600">Políticas de Privacidad</Link>
            <Link to="/terminos" className="text-xs text-gray-400 hover:text-gray-600">Términos y Condiciones</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;