function ProductModal({ product, onClose, addToCart }) {
  if (!product) return null; // Si no hay producto seleccionado, no muestra nada

  return (
    // 1. Fondo Oscuro (Overlay)
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose} // Cierra si das clic afuera
    >
      
      {/* 2. La Tarjeta del Modal (Evitamos que se cierre al dar clic adentro con stopPropagation) */}
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row relative animate-scale-up"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* Botón de Cerrar (X) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-gray-100 text-gray-500 z-10 transition shadow-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Lado Izquierdo: Imagen Grande */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100">
          <img 
            src={product.img} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Lado Derecho: Información */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
            <div className="mb-4">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {product.category}
                </span>
            </div>
          
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h2>
            <p className="text-3xl font-bold text-blue-600 mb-6">{product.price}</p>
            
            <div className="prose text-gray-600 mb-8 leading-relaxed">
                <p>{product.description}</p>
                <ul className="mt-4 space-y-2 text-sm">
                   <li>☀️ <strong>Luz:</strong> Indirecta brillante.</li>
                   <li>💧 <strong>Agua:</strong> Regar cada 3 días.</li>
                   <li>🌱 <strong>Cuidado:</strong> {product.care || "Fácil de mantener."}</li>
                </ul>
            </div>

            <div className="flex gap-4 mt-auto">
                <button 
                    onClick={() => {
                        addToCart(product);
                        onClose(); // Cerramos el modal después de agregar
                    }}
                    className="flex-1 bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30 active:scale-95 flex justify-center items-center gap-2"
                >
                    <span>Agregar al Carrito</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;