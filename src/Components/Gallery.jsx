import React, { useState, useEffect } from 'react';
import { Search, Heart } from 'lucide-react'; 
import SkeletonCard from './SkeletonCard';

const Gallery = ({ products, addToCart, isLoading }) => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  
  // 💖 1. LÓGICA DE FAVORITOS (Persistencia en LocalStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("flowerFavorites")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("flowerFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  // 🏷️ 2. CATEGORÍAS (Incluyendo la sección personal de favoritos)
  const categories = ['Todos', 'Mis Favoritos ', 'Flores', 'Plantas', 'Postres y Vinos', 'Globos y Peluches', 'Combos', 'Personalizados'];

  // 🧠 3. FILTRADO MULTI-CRITERIO (Categoría + Búsqueda)
  const filteredProducts = products.filter(p => {
    // Filtro por Categoría (Con caso especial para la Wishlist)
    const matchesCategory = 
      activeCategory === 'Todos' 
      ? true 
      : activeCategory === 'Mis Favoritos '
        ? favorites.includes(p.id)
        : (p.category && p.category.includes(activeCategory));

    // Filtro por Búsqueda (Nombre o Descripción)
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6">
      
      {/* --- ENCABEZADO --- */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-serif text-gray-900 mb-3 italic tracking-tight">Nuestra Colección</h2>
        <div className="w-24 h-1.5 bg-pink-500 mx-auto rounded-full"></div>
      </div>

      {/* --- BARRA DE BÚSQUEDA --- */}
      <div className="max-w-xl mx-auto mb-10 relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="¿Qué flores buscas hoy? (ej. Rosas, Girasoles...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
          className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm 
                     focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none 
                     transition-all duration-300 text-gray-700 placeholder:text-gray-400
                     disabled:opacity-50"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-pink-500 transition-colors"
          >
            <span className="text-xl">✕</span>
          </button>
        )}
      </div>

      {/* --- NAVEGACIÓN DE CATEGORÍAS --- */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            disabled={isLoading}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
              ${activeCategory === cat 
                ? 'bg-pink-500 text-white shadow-lg scale-105' 
                : 'bg-white text-gray-600 border border-gray-100 hover:bg-pink-50 hover:border-pink-200 disabled:opacity-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- CONTADOR DINÁMICO --- */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-gray-500 font-medium italic">
            {isLoading ? (
              "Sincronizando con el jardín..."
            ) : (
              <>
                Mostrando <span className="text-gray-900 font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'diseño floral' : 'diseños florales'}
                {searchTerm && <span> para "<span className="text-pink-600">{searchTerm}</span>"</span>}
              </>
            )}
          </p>
        </div>
        {!isLoading && <div className="hidden md:block h-px bg-gray-100 flex-grow ml-6"></div>}
      </div>

      {/* --- REJILLA DE PRODUCTOS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col 
                         transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 
                         hover:border-pink-100 animate-in fade-in duration-700"
            >
              <div className="relative h-80 bg-gray-50 flex items-center justify-center overflow-hidden">
                
                {/* ❤️ BOTÓN DE FAVORITOS FLOTANTE */}
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 z-30 p-3 rounded-full bg-white/80 backdrop-blur-md shadow-sm 
                             transition-all hover:scale-110 active:scale-90"
                >
                  <Heart 
                    size={20} 
                    className={`transition-colors ${favorites.includes(product.id) ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} 
                  />
                </button>

                <img 
                  src={product.image} 
                  alt={product.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                  onError={(e) => { 
                    e.target.style.display = 'none'; 
                    e.target.nextSibling.style.display = 'block';
                  }} 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-900 shadow-sm z-20">
                  {product.category || 'Colección'}
                </span>
              </div>

              <div className="p-7 flex flex-col flex-grow">
                <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed italic">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-xs text-gray-400 block uppercase font-bold tracking-tighter">Precio</span>
                    <span className="text-2xl font-black text-gray-900">${product.price}</span>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-gray-900 text-white px-6 py-3 rounded-2xl flex items-center gap-2 
                               hover:bg-pink-600 transition-all duration-300 transform 
                               active:scale-95 shadow-xl hover:shadow-pink-200"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest">Añadir</span>
                    <span className="text-xl font-light">+</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* MODO VACÍO */
          <div className="col-span-full text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4">{activeCategory === 'Mis Favoritos ' ? '🤍' : '🥀'}</div>
            <p className="text-xl text-gray-600 mb-2">
              {activeCategory === 'Mis Favoritos ' ? 'Aún no tienes diseños favoritos.' : 'No encontramos flores que coincidan.'}
            </p>
            <p className="text-gray-400 mb-6">Prueba con otros términos o explora el catálogo completo.</p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveCategory('Todos');}} 
              className="px-8 py-3 bg-pink-500 text-white rounded-full font-bold shadow-lg hover:bg-pink-600 transition-all"
            >
              Restablecer navegación
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;