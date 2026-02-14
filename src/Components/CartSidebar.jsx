import React from 'react';

// Recuerda: Recibe 'subtotal' desde App.jsx para la suma correcta
function CartSidebar({ isOpen, onClose, cartItems, removeFromCart, onCheckout, subtotal }) {
  
  return (
    <div 
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Fondo oscuro */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Panel lateral */}
      <div 
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        
        {/* Encabezado */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-gray-900">Tu carrito ({cartItems.length})</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          
          {cartItems.length === 0 ? (
            /* --- ESTADO VACÍO (ESTILO FOTO) --- */
            <div className="h-full flex flex-col items-center justify-center text-center px-8">
              {/* Icono Gris Grande */}
              <div className="mb-6 text-gray-200">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-600 mb-3">Tu carrito está vacío</h3>
              
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
                Llénalo de flores, postres, globos, plantas, perfumes, vinos...
              </p>
              
              <button 
                onClick={onClose}
                className="mt-8 px-8 py-3 bg-white border border-gray-300 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-black transition-all shadow-sm"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            /* --- LISTA DE PRODUCTOS --- */
            <div className="space-y-4">
               {cartItems.map((item, index) => {
                  if (!item) return null; 
                  const imgSrc = item.img || "https://via.placeholder.com/150";
                  const precio = item.price || 0;

                  return (
                    <div key={index} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={imgSrc} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-gray-900 text-sm leading-tight pr-4">{item.name}</h3>
                          <p className="font-bold font-mono text-sm text-gray-900">${precio}</p>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                           <span className="text-xs text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-1 rounded">{item.category}</span>
                           <button onClick={() => removeFromCart(index)} className="text-xs text-red-400 hover:text-red-600 font-bold flex items-center gap-1">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                             Eliminar
                           </button>
                        </div>
                      </div>
                    </div>
                  );
               })}
            </div>
          )}
        </div>

        {/* Footer con Total (Solo si hay items) */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium text-sm">Total parcial</span>
              <span className="text-2xl font-bold font-mono text-gray-900">${subtotal}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Proceder al pago</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartSidebar;