import { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';

const COLORS = ['#d4af37', '#111827', '#f472b6', '#10b981', '#6366f1'];

function AdminPanel({ products, refreshProducts, onLogout }) {
  const [view, setView] = useState('inventory');
  const [stats, setStats] = useState({ payments: [], sales: [], totalRevenue: 0 });
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // FORMULARIO CON TODOS LOS CAMPOS RECUPERADOS
  const [formData, setFormData] = useState({ 
    id: null, nombre: '', precio: '', categoria: '', imagen_url: '', descripcion: '' 
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // EFECTO: CARGA DE DATOS DESDE POSTGRESQL
  useEffect(() => {
    if (view === 'stats' || view === 'orders') {
      fetch('http://localhost:3000/api/admin-data')
        .then(res => res.json())
        .then(data => {
          // Procesar estadísticas para gráficas
          const salesData = data.stats?.sales || [];
          const total = salesData.reduce((acc, curr) => acc + parseFloat(curr.total || 0), 0);
          
          setStats({ 
            payments: data.stats?.payments || [], 
            sales: salesData, 
            totalRevenue: total 
          });
          
          // Cargar órdenes para la tabla
          setOrders(data.orders || []);
        })
        .catch(err => console.error("Error al sincronizar con la DB:", err));
    }
  }, [view]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = isEditing ? `http://localhost:3000/api/productos/${formData.id}` : 'http://localhost:3000/api/productos';
      await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if(refreshProducts) await refreshProducts(); 
      resetForm();
    } catch (error) { console.error(error); } finally { setIsLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Retirar este diseño de la colección?")) return;
    try {
      await fetch(`http://localhost:3000/api/productos/${id}`, { method: 'DELETE' });
      if(refreshProducts) await refreshProducts();
    } catch (error) { console.error(error); }
  };

  const resetForm = () => {
    setFormData({ id: null, nombre: '', precio: '', categoria: '', imagen_url: '', descripcion: '' });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] p-4 md:p-8 pt-28 font-serif">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER PREMIUM --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-200 pb-8 gap-6">
          <h2 className="text-4xl font-light text-gray-900 tracking-tighter italic">
            Flower<span className="text-[#d4af37] font-bold">Shop</span> Admin
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
              <button onClick={() => setView('inventory')} className={`px-6 py-2.5 rounded-xl text-[9px] font-black tracking-widest ${view === 'inventory' ? 'bg-[#d4af37] text-white shadow-lg' : 'text-gray-400'}`}>INVENTARIO</button>
              <button onClick={() => setView('orders')} className={`px-6 py-2.5 rounded-xl text-[9px] font-black tracking-widest ${view === 'orders' ? 'bg-[#d4af37] text-white shadow-lg' : 'text-gray-400'}`}>ÓRDENES</button>
              <button onClick={() => setView('stats')} className={`px-6 py-2.5 rounded-xl text-[9px] font-black tracking-widest ${view === 'stats' ? 'bg-[#d4af37] text-white shadow-lg' : 'text-gray-400'}`}>ANÁLISIS</button>
            </div>

            {/* BOTÓN SALIDA (onLogout ahora sí funciona) */}
            <button onClick={onLogout} className="group bg-white border border-red-50 p-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
              <svg className="w-5 h-5 text-red-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* --- VISTA 1: ÓRDENES (TABLA RECUPERADA) --- */}
        {view === 'orders' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h3 className="text-xl font-bold italic tracking-tighter">Pedidos Recientes</h3>
                <span className="bg-green-50 text-green-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">En Línea</span>
              </div>
              <table className="w-full text-left font-sans">
                <thead className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] border-b">
                  <tr><th className="p-6">Referencia</th><th className="p-6">Cliente</th><th className="p-6">Total</th><th className="p-6 text-right">Ubicación</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.length > 0 ? orders.map(o => (
                    <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-6 font-mono text-gray-400">#{o.id.slice(0,8)}</td>
                      <td className="p-6 font-bold text-gray-800">{o.customer_name}</td>
                      <td className="p-6 font-black text-gray-900">${o.total}</td>
                      <td className="p-6 text-right">
                        <button onClick={() => setSelectedOrder(o)} className="text-[9px] font-black uppercase tracking-widest bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-[#d4af37]">Ver Mapa 📍</button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4" className="p-20 text-center text-gray-400 italic">No hay órdenes registradas en la base de datos.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- VISTA 2: INVENTARIO (CON DESCRIPCIÓN) --- */}
        {view === 'inventory' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in duration-700">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 h-fit">
              <h3 className="text-xl font-bold text-gray-900 mb-8 italic">✦ {isEditing ? 'Editar' : 'Nuevo'} Arreglo</h3>
              <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                <input required placeholder="Nombre" className="w-full border-b border-gray-100 py-2 text-sm outline-none font-bold" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="number" placeholder="Precio" className="w-full border-b border-gray-100 py-2 text-sm outline-none" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} />
                  <select required className="w-full border-b border-gray-100 py-2 text-sm outline-none text-[#d4af37] font-bold" value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})}>
                    <option value="" disabled>Categoría</option>
                    {['Flores', 'Plantas', 'Postres y Vinos', 'Combos'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                {/* DESCRIPCIÓN RECUPERADA */}
                <textarea placeholder="Descripción del producto..." className="w-full border border-gray-100 p-3 rounded-xl text-sm outline-none h-24 resize-none focus:border-[#d4af37]" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} />
                <input required type="url" placeholder="URL de Imagen" className="w-full border-b border-gray-100 py-2 text-sm outline-none" value={formData.imagen_url} onChange={e => setFormData({...formData, imagen_url: e.target.value})} />
                <button type="submit" disabled={isLoading} className="w-full bg-[#d4af37] text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] shadow-xl hover:bg-black transition-all active:scale-95">
                  {isEditing ? 'Actualizar Producto' : 'Insertar en DB'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
              <table className="w-full text-left font-sans">
                <thead className="bg-[#fafaf9] border-b text-[10px] font-black text-[#d4af37] uppercase tracking-widest">
                  <tr><th className="p-6">Vista</th><th className="p-6">Producto</th><th className="p-6 text-right">Acciones</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products?.map(p => (
                    <tr key={p.id} className="group hover:bg-gray-50 transition-all">
                      <td className="p-6"><img src={p.imagen_url} className="w-16 h-16 rounded-3xl object-cover border border-gray-100 shadow-sm" /></td>
                      <td className="p-6"><p className="font-bold text-gray-800 text-sm">{p.nombre}</p><span className="text-[9px] font-black uppercase text-pink-500">{p.categoria}</span></td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                          <button onClick={() => {setFormData(p); setIsEditing(true); window.scrollTo({top:0, behavior:'smooth'})}} className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase hover:bg-[#d4af37]">Editar</button>
                          <button onClick={() => handleDelete(p.id)} className="bg-white text-gray-400 border border-gray-100 px-5 py-2.5 rounded-xl text-[9px] font-black uppercase hover:bg-red-500 hover:text-white">Retirar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- VISTA 3: ANÁLISIS (DASHBOARD COMPLETO) --- */}
        {view === 'stats' && (
          <div className="space-y-10 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Ingresos Totales</p>
                <h4 className="text-5xl font-light text-gray-900 italic tracking-tighter">${stats.totalRevenue.toLocaleString()}</h4>
              </div>
              <div className="bg-[#d4af37] p-10 rounded-[2.5rem] shadow-xl text-white text-center font-bold tracking-widest italic flex items-center justify-center gap-2">POSTGRES V15 🐘</div>
              <div className="bg-gray-900 p-10 rounded-[2.5rem] shadow-xl text-white text-center font-bold tracking-widest italic flex items-center justify-center">OPTIMIZADO CLOUD</div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-20">
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 h-96 shadow-sm">
                 <h5 className="text-[10px] font-black uppercase tracking-widest mb-6 text-gray-400">Tendencia Semanal</h5>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.sales}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" /><XAxis dataKey="date" fontSize={10} axisLine={false} tickLine={false} /><YAxis fontSize={10} axisLine={false} tickLine={false} /><Tooltip contentStyle={{borderRadius: '24px', border: 'none'}} /><Line type="monotone" dataKey="total" stroke="#d4af37" strokeWidth={5} dot={{r: 7, fill: '#d4af37'}} /></LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 h-96 shadow-sm">
                <h5 className="text-[10px] font-black uppercase tracking-widest mb-6 text-gray-400">Distribución de Pagos</h5>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={stats.payments} innerRadius={80} outerRadius={105} paddingAngle={10} dataKey="value">{stats.payments.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie><Tooltip /><Legend verticalAlign="bottom" iconType="circle" /></PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL MAPA --- */}
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h4 className="text-xl font-bold italic tracking-tighter">📍 Entrega: {selectedOrder.customer_name}</h4>
                <button onClick={() => setSelectedOrder(null)} className="font-black text-[10px] tracking-widest text-gray-400 hover:text-red-500 transition-colors">Cerrar ✕</button>
              </div>
              <iframe title="Map" width="100%" height="500" src={`http://googleusercontent.com/maps.google.com/4{encodeURIComponent(selectedOrder.address || 'Tijuana')}&output=embed`}></iframe>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminPanel;