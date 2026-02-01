import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ nombre: '', mensaje: '' });

  const handleSend = () => {
    if (!formData.nombre || !formData.mensaje) return alert("Llena los campos porfa 🙏");
    
    // Crea el link de WhatsApp
    const phone = "526641234567"; // TU NÚMERO
    const text = `Hola, soy ${formData.nombre}. ${formData.mensaje}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    
    window.open(url, '_blank');
  };

  return (
    <section id="contacto" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">¿Tienes un pedido especial?</h2>
        <div className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Nombre</label>
              <input 
                type="text" 
                placeholder="Tu nombre" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-bold mb-2">Mensaje</label>
              <textarea 
                rows="4" 
                placeholder="Cuéntanos qué flores buscas..." 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={formData.mensaje}
                onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="button" 
              onClick={handleSend} // <--- Conecta la función
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 mt-2"
            >
              Enviar por WhatsApp 
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;