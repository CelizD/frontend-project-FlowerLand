import { useState } from 'react';
import ProductModal from './ProductModal';

// AHORA RECIBE 'products' COMO PROP (viene desde App.jsx)
function Gallery({ addToCart, products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedFlower, setSelectedFlower] = useState(null); 

  // Categorías disponibles para filtrar
  const categories = ["todos", "romance", "jardín", "primavera", "elegancia", "decoración", "campo"];

  // Lógica de filtrado usando la lista 'products' que recibimos
  const filteredFlowers = products.filter((flower) => {
    const matchesSearch = flower.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "todos" || flower.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="galeria" className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 lowercase tracking-tight">nuestra colección</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm lowercase">
            explora la selección de flores frescas de temporada.
          </p>
        </div>
        
        {/* Controles (Buscador y Categorías) */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          
          {/* Botones de Categoría */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 lowercase ${
                  selectedCategory === cat 
                    ? "bg-black text-white shadow-md" 
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Buscador */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="buscar flor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-black transition-all text-sm lowercase"
            />
            {/* Icono Lupa SVG */}
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Grid de Productos */}
        {filteredFlowers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredFlowers.map((flower) => (
              <div key={flower.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                
                {/* Imagen (Clickeable para abrir Modal) */}
                <div 
                    className="h-64 overflow-hidden relative cursor-pointer bg-gray-100"
                    onClick={() => setSelectedFlower(flower)}
                >
                  <img 
                    src={flower.img} 
                    alt={flower.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay "Ver Detalle" */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full font-bold text-xs shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform lowercase">
                        ver detalle
                    </span>
                  </div>

                  {/* Etiqueta de categoría */}
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm lowercase tracking-wider">
                    {flower.category}
                  </span>
                </div>
                
                {/* Información y Botón */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-800 lowercase">{flower.name}</h3>
                    <p className="text-blue-600 font-bold text-lg font-mono">{flower.price}</p>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(flower)} 
                    className="w-full bg-black text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2 active:scale-95 lowercase text-sm"
                  >
                    <span>agregar al carrito</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Estado Vacío */
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-400 text-sm mb-4 lowercase">no se encontraron productos</p>
            <button 
              onClick={() => {setSearchTerm(""); setSelectedCategory("todos");}}
              className="text-blue-600 hover:text-blue-800 font-bold text-xs lowercase underline"
            >
              limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* MODAL DE VISTA RÁPIDA */}
      <ProductModal 
        product={selectedFlower}             
        onClose={() => setSelectedFlower(null)} 
        addToCart={addToCart}                
      />

    </section>
  );
}

export default Gallery;