import { useEffect, useState } from 'react';

function CartSidebar({ isOpen, onClose, cartItems, removeFromCart, onCheckout }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => {
      const priceNumber = parseFloat(item.price.replace('$', ''));
      return acc + priceNumber;
    }, 0);
    setTotal(newTotal);
  }, [cartItems]);

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
      <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800 lowercase">tu carrito</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-180px)]">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400 mt-20 flex flex-col items-center">
              <p className="lowercase font-bold text-xs tracking-widest">carrito vacío</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex gap-4 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100 shadow-sm animate-fade-in-up">
                <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm lowercase">{item.name}</h4>
                  <p className="text-blue-600 font-bold text-sm">{item.price}</p>
                </div>
                <button onClick={() => removeFromCart(index)} className="text-gray-400 hover:text-red-500 p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 w-full bg-white border-t p-6 shadow-inner">
          <div className="flex justify-between items-center mb-6 text-xl font-bold text-gray-800">
            <span className="lowercase">total:</span>
            <span>${total}</span>
          </div>
          <button onClick={onCheckout} disabled={cartItems.length === 0} className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex justify-center items-center gap-2 ${cartItems.length === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-900 text-white hover:bg-black"}`}>
            <span className="lowercase">pagar ahora</span>
            {cartItems.length > 0 && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>}
          </button>
        </div>
      </div>
    </>
  );
}

export default CartSidebar;