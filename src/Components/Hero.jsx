import React from 'react';

function Hero() {
  return (
    <div className="relative w-full min-h-[90vh] bg-[#fdfbf7] flex items-center overflow-hidden">
      
      {/* Círculo decorativo de fondo (Blur) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* TEXTO (Izquierda) */}
        <div className="text-center md:text-left pt-20 md:pt-0">
          <span className="inline-block py-1 px-3 border border-gray-900 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
            Envío Express en Tijuana
          </span>
          
          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 leading-[1.1] mb-6">
            Dilo con <br/>
            <span className="italic text-gray-400">flores</span> eternas.
          </h1>
          
          <p className="text-gray-500 text-lg font-light max-w-md mx-auto md:mx-0 mb-8 leading-relaxed">
            Diseños florales de autor para esos momentos que no necesitan palabras. Entrega el mismo día en Tijuana y Rosarito.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="#galeria" 
              className="px-8 py-4 bg-gray-900 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Ver Catálogo
            </a>
            <button className="px-8 py-4 bg-white border border-gray-200 text-gray-900 font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gray-50 transition-all">
              ¿Cómo funciona?
            </button>
          </div>
        </div>

        {/* IMAGEN (Derecha) */}
        <div className="relative h-[500px] md:h-[700px] w-full">
          <div className="absolute inset-0 bg-gray-200 rounded-t-[10rem] rounded-b-[2rem] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=2128&auto=format&fit=crop" 
              alt="Ramo elegante" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
            />
            
            {/* Tarjeta flotante "Entrega Hoy" (Estilo EnviaFlores pero Premium) */}
            <div className="absolute bottom-10 left-0 right-0 mx-auto w-max bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-4 animate-bounce-slow">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Status</p>
                <p className="text-sm font-serif font-bold text-gray-900">Entrega Disponible Hoy</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Hero;