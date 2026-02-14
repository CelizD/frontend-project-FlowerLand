import React from 'react';

function Services() {
  // Lista de servicios con iconos (puedes cambiar los iconos SVG si gustas)
  const services = [
    {
      title: "Para alguien especial",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      desc: "Detalles que enamoran"
    },
    {
      title: "En momentos difíciles",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      desc: "Respeto y condolencias"
    },
    {
      title: "Crea tu arreglo",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      desc: "Tu estilo, tus flores"
    },
    {
      title: "Nosotros lo hacemos por ti",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      desc: "Diseño experto"
    },
    {
      title: "Eventos especiales",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      desc: "Bodas y celebraciones"
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Título de Sección */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl font-serif text-gray-900 mt-3">
            Ocasiones Inolvidables
          </h2>
        </div>

        {/* Grid de Servicios */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {services.map((item, index) => (
            <div 
              key={index} 
              className="group p-6 rounded-xl hover:bg-gray-50 transition-all duration-500 cursor-pointer flex flex-col items-center"
            >
              {/* Círculo del Icono */}
              <div className="w-16 h-16 rounded-full bg-gray-50 group-hover:bg-white border border-gray-100 group-hover:border-black flex items-center justify-center mb-6 transition-all duration-500 text-gray-600 group-hover:text-black">
                {item.icon}
              </div>
              
              {/* Texto */}
              <h3 className="font-serif text-lg text-gray-900 mb-2 leading-tight group-hover:translate-y-[-2px] transition-transform">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;