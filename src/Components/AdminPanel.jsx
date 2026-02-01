import { useState } from 'react';

function AdminPanel({ products, onAddProduct, onDeleteProduct, onEditProduct }) {
  // Formulario para agregar/editar
  const [formData, setFormData] = useState({ id: null, name: '', price: '', category: '', img: '', description: '', care: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      onEditProduct(formData);
      setIsEditing(false);
    } else {
      // Generar ID único temporal
      onAddProduct({ ...formData, id: Date.now() });
    }
    setFormData({ id: null, name: '', price: '', category: '', img: '', description: '', care: '' });
  };

  const handleEditClick = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 lowercase tracking-tighter">panel de administración</h2>
          <div className="bg-black text-white px-4 py-2 rounded text-xs font-mono">v1.0.0</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. FORMULARIO DE CONTROL */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
            <h3 className="text-xl font-bold mb-4 lowercase flex items-center gap-2">
              {isEditing ? 'editar producto' : 'nuevo producto'}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input required type="text" placeholder="nombre del producto" className="border p-2 rounded text-sm w-full" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <div className="flex gap-2">
                <input required type="text" placeholder="precio (ej: $150)" className="border p-2 rounded text-sm w-1/2" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                <input required type="text" placeholder="categoría" className="border p-2 rounded text-sm w-1/2" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
              </div>
              <input required type="text" placeholder="url de la imagen" className="border p-2 rounded text-sm w-full" value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} />
              <textarea placeholder="descripción técnica" className="border p-2 rounded text-sm w-full" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              <input type="text" placeholder="instrucciones de cuidado" className="border p-2 rounded text-sm w-full" value={formData.care} onChange={e => setFormData({...formData, care: e.target.value})} />
              
              <div className="flex gap-2 mt-2">
                <button type="submit" className={`flex-1 text-white py-3 rounded font-bold lowercase transition ${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-black hover:bg-gray-800'}`}>
                  {isEditing ? 'guardar cambios' : 'crear producto'}
                </button>
                {isEditing && (
                  <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, name: '', price: '', category: '', img: '', description: '', care: '' }); }} className="bg-gray-200 text-gray-600 px-4 rounded font-bold lowercase hover:bg-gray-300">
                    cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* 2. TABLA DE INVENTARIO */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold tracking-wider">
                    <th className="p-4">img</th>
                    <th className="p-4">producto</th>
                    <th className="p-4">precio</th>
                    <th className="p-4">cat</th>
                    <th className="p-4 text-right">acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="p-4"><img src={product.img} className="w-10 h-10 rounded object-cover bg-gray-200" alt="" /></td>
                      <td className="p-4 font-bold text-gray-800 text-sm lowercase">{product.name}</td>
                      <td className="p-4 text-blue-600 font-mono text-sm">{product.price}</td>
                      <td className="p-4 text-xs text-gray-500 lowercase">{product.category}</td>
                      <td className="p-4 flex justify-end gap-2">
                        {/* Botón Editar */}
                        <button onClick={() => handleEditClick(product)} className="text-blue-500 hover:bg-blue-50 p-2 rounded transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        {/* Botón Borrar */}
                        <button onClick={() => onDeleteProduct(product.id)} className="text-red-500 hover:bg-red-50 p-2 rounded transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminPanel;