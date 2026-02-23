import React from 'react';
import Hero from '../Components/Hero';        
import Gallery from '../Components/Gallery';   

/**
 * Componente Tienda: Orquestador de la vista principal de FlowerLand.
 * Maneja la lógica de presentación de productos y estados de carga.
 */
function Tienda({ products, addToCart }) {
  
  // Lógica de Estado de Carga:
  // Si el arreglo de productos está vacío, activamos el modo de carga (Skeletons).
  // Esto previene el salto visual (layout shift) mientras PostgreSQL responde.
  const isLoading = products.length === 0;

  return (
    <main className="bg-white min-h-screen">
      
      {/* 1. SECCIÓN HERO: Impacto visual y call-to-action */}
      {/* Esta sección es estática y carga de inmediato para mejorar el LCP */}
      <Hero />

      {/* 2. SECCIÓN DE GALERÍA: Presentación dinámica de productos */}
      {/* El id "galeria" permite el scroll suave desde el botón del Hero */}
      <div id="galeria" className="py-12 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        
        {/* Encabezado de la Sección */}
        <div className="max-w-7xl mx-auto mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter italic">
            Nuestras Colecciones
          </h2>
          <div className="h-1 w-20 bg-pink-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Inyección de la Galería: 
          Pasamos 'isLoading' para que el componente Gallery decida 
          si renderizar Skeletons o los ProductCards reales.
        */}
        <Gallery 
          products={products} 
          addToCart={addToCart} 
          isLoading={isLoading} 
        />
      </div>

      {/* Tip de UX: Podrías agregar una sección de "Beneficios" aquí abajo 
        (Envío gratis en Tijuana, Pago Seguro, Flores Frescas)
      */}
      
    </main>
  );
}

export default Tienda;