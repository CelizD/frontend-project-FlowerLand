function OrdersModal({ isOpen, onClose, orders }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="bg-gray-900 px-6 py-4 flex justify-between items-center text-white">
          <h3 className="text-xl font-bold lowercase tracking-wider text-sm">historial de pedidos</h3>
          <button onClick={onClose} className="hover:text-gray-300">cerrar</button>
        </div>
        <div className="p-6 overflow-y-auto bg-gray-50 flex-1">
          {orders.length === 0 ? (
            <p className="text-center text-gray-400 lowercase py-10">sin pedidos registrados</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white border mb-4 p-4 rounded-xl shadow-sm">
                <div className="flex justify-between border-b pb-2 mb-2">
                  <div>
                    <span className="text-xs font-bold text-gray-400">folio {order.id}</span>
                    <p className="text-gray-700 text-xs">{order.date}</p>
                  </div>
                  <span className="font-bold text-gray-900">${order.total}</span>
                </div>
                {order.items.map((item, idx) => (
                  <div key={idx} className="text-xs text-gray-500 lowercase flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersModal;