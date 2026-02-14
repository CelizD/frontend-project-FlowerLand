import { useState } from 'react';

function AdminPanel({ products, refreshProducts }) {
  // Estado del formulario
  const [formData, setFormData] = useState({ 
    id: null, // Usaremos esto para saber si estamos editando
    name: '', 
    price: '', 
    category: '', 
    img: '', 
    description: '', 
    care: '' 
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- 1. CREAR O EDITAR PRODUCTO (POST / PUT) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing) {
        // MODO EDICIÓN (PUT) -> Actualizar en MongoDB
        // Nota: MongoDB usa "_id", asegúrate de usarlo en la URL
        await fetch(`http://localhost:5000/api/products/${formData._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        // MODO CREACIÓN (POST) -> Guardar nuevo en MongoDB
        await fetch('http://localhost:5000/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      // Recargar la lista de productos y limpiar formulario
      await refreshProducts(); 
      resetForm();
      alert(isEditing ? "¡Producto actualizado!" : "¡Producto creado!");

    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un error al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. BORRAR PRODUCTO (DELETE) ---
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      await refreshProducts(); // Recargar lista
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // --- UTILIDADES ---
  const handleEditClick = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({ id: null, name: '', price: '', category: '', img: '', description: '', care: '' });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* CABECERA */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 lowercase tracking-tighter">
            panel de administración
            <span className="text-xs text-gray-400 font-normal ml-2 block sm:inline">Conectado a MongoDB Atlas 🍃</span>
          </h2>
          <div className="bg-green-600 text-white px-4 py-2 rounded text-xs font-mono shadow-lg">ONLINE</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. FORMULARIO DE CONTROL (IZQUIERDA) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit sticky top-24">
            <h3 className="text-xl font-bold mb-4 lowercase flex items-center gap-2 border-b pb-2">
              {isEditing ? '✏️ editar producto' : '✨ nuevo producto'}
            </h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Nombre</label>
                <input required type="text" className="border p-2 rounded text-sm w-full focus:ring-2 focus:ring-green-500 outline-none" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="flex gap-2">
                <div className="w-1/2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Precio</label>
                  <input required type="text" placeholder="$0.00" className="border p-2 rounded text-sm w-full focus:ring-2 focus:ring-green-500 outline-none" 
                    value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div className="w-1/2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Categoría</label>
                  <input required type="text" className="border p-2 rounded text-sm w-full focus:ring-2 focus:ring-green-500 outline-none" 
                    value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">URL Imagen</label>
                <input required type="text" placeholder="https://..." className="border p-2 rounded text-sm w-full focus:ring-2 focus:ring-green-500 outline-none" 
                  value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} />
              </div>

              {/* Vista previa de la imagen pequeña */}
              {formData.img && (
                <img src={formData.img} alt="Preview" className="w-full h-32 object-cover rounded-md border border-gray-200" />
              )}
              
              <div className="flex gap-2 mt-4">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`flex-1 text-white py-3 rounded font-bold lowercase transition shadow-md ${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-black'}`}
                >
                  {isLoading ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Producto')}
                </button>
                
                {isEditing && (
                  <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-600 px-4 rounded font-bold lowercase hover:bg-gray-300 transition">
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* 2. TABLA DE INVENTARIO (DERECHA) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold tracking-wider">
                    <th className="p-4">Img</th>
                    <th className="p-4">Producto</th>
                    <th className="p-4">Precio</th>
                    <th className="p-4">Cat</th>
                    <th className="p-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-400">
                        No hay productos en la base de datos.<br/>¡Agrega el primero!
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      // OJO: MongoDB usa "_id", no "id"
                      <tr key={product._id} className="hover:bg-gray-50 transition">
                        <td className="p-4">
                          <img src={product.img} className="w-12 h-12 rounded-lg object-cover border border-gray-200" alt="" />
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-gray-800 text-sm">{product.name}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[150px]">{product._id}</p>
                        </td>
                        <td className="p-4 text-green-600 font-mono text-sm font-bold">{product.price}</td>
                        <td className="p-4">
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs lowercase border border-gray-200">
                            {product.category}
                          </span>
                        </td>
                        <td className="p-4 flex justify-end gap-2 items-center h-full">
                          {/* Botón Editar */}
                          <button onClick={() => handleEditClick(product)} className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition" title="Editar">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          {/* Botón Borrar */}
                          <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:bg-red-100 p-2 rounded-full transition" title="Eliminar">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
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