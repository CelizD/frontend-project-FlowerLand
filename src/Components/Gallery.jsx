import React, { useState } from 'react';

const Gallery = ({ products, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  // Categorías
  const categories = ['Todos', 'Flores', 'Plantas', 'Postres y Vinos', 'Globos y Peluches', 'Combos', 'Personalizados'];

  // Filtro seguro
  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category && p.category.includes(activeCategory));

  return (
    <div className="max-w-7xl mx-auto px-6">
      
      {/* Título */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif text-gray-900 mb-2">Nuestra Colección</h2>
        <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full"></div>
      </div>

      {/* Botones Categorías */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${activeCategory === cat 
                ? 'bg-pink-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-pink-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* REJILLA DE PRODUCTOS (Modo Sin Internet) */}
      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              
              {/* IMAGEN: Si no carga, mostramos un cuadro de color */}
              <div className="relative h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                {/* Intentamos mostrar la imagen, pero si falla la ocultamos y dejamos el cuadro gris */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
                <span className="absolute text-sm">Sin conexión (Imagen)</span>
              </div>

              {/* INFO */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-serif text-gray-900 mb-1">{product.name}</h3>
                <p className="text-gray-500 text-xs mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-600"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p>No se encontraron productos en esta categoría.</p>
          <button onClick={() => setActiveCategory('Todos')} className="mt-4 text-pink-500 underline">
            Ver todos
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;