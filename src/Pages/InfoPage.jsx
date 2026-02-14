import React from 'react';

function InfoPage({ title, content, type }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 min-h-screen">
      {/* Encabezado Principal */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif text-gray-900 mb-4">{title}</h1>
        <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full"></div>
      </div>

      {/* DISEÑO PARA COBERTURA (Tablas y Zonas) */}
      {type === 'cobertura' ? (
        <div className="space-y-10">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-50 p-8 md:p-12 hover:shadow-2xl transition-shadow duration-500">
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-4xl">📍</span>
              <p className="text-2xl font-serif text-gray-800 italic">
                "Llevamos alegría a cada rincón de Tijuana"
              </p>
            </div>
            
            <p className="text-gray-600 leading-relaxed text-lg mb-10">
              Nuestros repartidores conocen cada colonia para garantizar que tus flores lleguen frescas y a tiempo. 
              Realizamos entregas en las siguientes zonas principales:
            </p>

            {/* Grid de Zonas Estilizado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                { nombre: 'Zona Río / Cacho', precio: '$99', status: 'Entrega Hoy' },
                { nombre: 'Playas de Tijuana', precio: '$150', status: 'Entrega Hoy' },
                { nombre: 'Otay / Aeropuerto', precio: '$120', status: 'Entrega Hoy' },
                { nombre: 'Santa Fe / Rosarito N.', precio: '$180', status: 'Programado' }
              ].map((zona) => (
                <div key={zona.nombre} className="bg-pink-50 p-5 rounded-2xl flex justify-between items-center border border-pink-100 hover:bg-pink-100 transition-colors">
                  <div>
                    <span className="block font-bold text-gray-800 text-lg">{zona.nombre}</span>
                    <span className="text-pink-500 text-xs font-semibold uppercase tracking-wider">{zona.status} ✅</span>
                  </div>
                  <span className="text-2xl font-serif text-gray-900">{zona.precio}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center border border-dashed border-gray-300">
              <p className="text-gray-500 italic">
                ¿No encuentras tu colonia? Escríbenos por WhatsApp y lo coordinamos de inmediato.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* DISEÑO PARA OTROS TEXTOS (Cómo comprar / Historia / Garantía) */
        <div className="bg-white rounded-3xl shadow-xl border border-gray-50 p-10 md:p-16">
          <div className="prose prose-pink max-w-none">
            <p className="text-2xl text-gray-700 font-serif leading-relaxed italic mb-8">
              {content || "Estamos preparando esta información para brindarte la mejor experiencia."}
            </p>
            <div className="h-px bg-gray-100 w-full my-8"></div>
            <p className="text-gray-600 leading-loose">
              En FlowerLand Tijuana, nuestra prioridad es la transparencia y la confianza. 
              Cada proceso está diseñado para que tu única preocupación sea disfrutar del aroma de nuestras flores.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoPage;