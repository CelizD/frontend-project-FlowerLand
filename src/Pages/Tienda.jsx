import React from 'react';
import Hero from '../Components/Hero';        
import Gallery from '../Components/Gallery';   

function Tienda({ products, addToCart }) {
  return (
    <main className="bg-white min-h-screen">
      
      {/* 1. Banner Premium (El que acabas de mandar) */}
      <Hero />

      {/* 2. Galería de Productos */}
      {/* AGREGUÉ id="galeria" AQUÍ PARA QUE EL BOTÓN BAJE */}
      <div id="galeria" className="py-10 scroll-mt-20"> 
        <Gallery products={products} addToCart={addToCart} />
      </div>
      
    </main>
  );
}

export default Tienda;