import React, { useState, useEffect } from 'react';
import { Package, Truck, CreditCard, Calendar } from 'lucide-react';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => console.error("Error cargando pedidos:", err));
  }, []);

  if (loading) return <div className="p-10 text-center">Cargando base de datos relacional...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic">Gestión de Pedidos</h1>
          <span className="bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm font-bold">
            {orders.length} Transacciones
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-black uppercase text-gray-400">ID</th>
                <th className="p-4 text-xs font-black uppercase text-gray-400">Cliente</th>
                <th className="p-4 text-xs font-black uppercase text-gray-400">Logística</th>
                <th className="p-4 text-xs font-black uppercase text-gray-400">Pago</th>
                <th className="p-4 text-xs font-black uppercase text-gray-400">Total</th>
                <th className="p-4 text-xs font-black uppercase text-gray-400">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono text-sm text-gray-400">#{order.id}</td>
                  <td className="p-4 font-bold text-gray-800">{order.customer_name}</td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm flex items-center gap-1 font-medium">
                        <Truck size={14} className="text-blue-500" /> {order.delivery_method}
                      </span>
                      <span className="text-[10px] text-gray-400 truncate max-w-[150px]">{order.address}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded font-bold uppercase flex items-center gap-1 w-fit">
                      <CreditCard size={12} /> {order.payment_method}
                    </span>
                  </td>
                  <td className="p-4 font-black text-green-600">${order.total}</td>
                  <td className="p-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} /> {new Date(order.created_at).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;