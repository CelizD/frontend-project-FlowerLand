import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { flowers } from './data'; 

// --- COMPONENTES ---
import Header from './Components/Header'; 
import Footer from './Components/Footer';
import CartSidebar from './Components/CartSidebar';
import CheckoutModal from './Components/CheckoutModal';
import LoginModal from './Components/LoginModal'; 
import WhatsAppBtn from './Components/WhatsAppBtn';
import ScrollToTop from './Components/ScrollToTop'; 
import AdminPanel from './Components/AdminPanel';
import AdminOrders from './Components/AdminOrders'; // 🌟 Nuevo: Gestión de Pedidos
// --- PÁGINAS ---
import Tienda from './Pages/Tienda';
import InfoPage from './Pages/InfoPage'; 

function App() {
  const [user, setUser] = useState(() => localStorage.getItem("flowerUser") || null);
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("flowerCart")) || []; } catch { return []; }
  });
  
  const [products, setProducts] = useState([]);
  
  // Estados de Modales
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 1. CARGA DINÁMICA DE PRODUCTOS (Resiliencia PostgreSQL -> Local)
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/productos');
      if (!response.ok) throw new Error("Fallo al conectar con la BD");
      const data = await response.json();
      
      const productosAdaptados = data.map(item => ({
        id: item.id,
        name: item.nombre,
        description: item.descripcion,
        price: item.precio,
        image: item.imagen_url,
        category: item.categoria
      }));

      setProducts(productosAdaptados); 
    } catch (error) {
      console.warn("Activando sistema de respaldo local (Modo Resiliencia)...");
      setProducts(flowers || []); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. PERSISTENCIA DE CARRITO
  useEffect(() => {
    localStorage.setItem("flowerCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const handleLogin = (u) => { 
    setUser(u); 
    localStorage.setItem("flowerUser", u); 
    setIsLoginModalOpen(false); 
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("flowerUser");
  };

  const totalCalculado = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);

  // Lógica de validación para Administrador
  const isAdmin = user === 'admin' || user === 'admin@flowerland.com';

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Header 
        cartCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginModalOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      <div className="flex flex-col min-h-screen">
        <main className="flex-grow pt-20 bg-gray-50">
          <Routes>
            {/* --- RUTAS PÚBLICAS --- */}
            <Route path="/" element={<Tienda products={products} addToCart={addToCart} />} />
            
            {/* --- RUTAS PROTEGIDAS (EL CANDADO DE ORO) --- */}
            <Route 
              path="/admin" 
              element={isAdmin ? (
                <AdminPanel 
                  products={products.map(p => ({
                    id: p.id, nombre: p.name, descripcion: p.description, 
                    precio: p.price, imagen_url: p.image, categoria: p.category
                  }))} 
                  refreshProducts={fetchProducts} 
                />
              ) : <Navigate to="/" replace />} 
            />

            <Route 
              path="/admin-orders" 
              element={isAdmin ? <AdminOrders /> : <Navigate to="/" replace />} 
            />
            
            {/* --- RUTAS DE INFORMACIÓN --- */}
            <Route path="/cobertura" element={<InfoPage title="Cobertura en Tijuana" type="cobertura" />} />
            <Route path="/como-comprar" element={<InfoPage title="¿Cómo comprar?" content="Navega por nuestro catálogo, elige tus flores favoritas y paga seguro." />} />
            <Route path="/envios" element={<InfoPage title="Política de Envíos" content="Entregamos de lunes a domingo en todo Tijuana." />} />
            <Route path="/preguntas-frecuentes" element={<InfoPage title="Preguntas Frecuentes" content="Resolvemos todas tus dudas aquí." />} />
            <Route path="/historia" element={<InfoPage title="Nuestra Historia" content="Nacimos del amor por la naturaleza en Tijuana." />} />
            <Route path="/garantia" element={<InfoPage title="Garantía de Calidad" content="Tu satisfacción es nuestra única prioridad." />} />
            <Route path="/opiniones" element={<InfoPage title="Opiniones de Clientes" content="Cientos de sonrisas entregadas nos respaldan." />} />
          </Routes>
        </main>

        <Footer />
      </div>

      <WhatsAppBtn />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        removeFromCart={(index) => setCartItems(cartItems.filter((_, i) => i !== index))}
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
        subtotal={totalCalculado}
      />

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        total={totalCalculado} 
        cartItems={cartItems}
        onConfirm={() => {setCartItems([]); setIsCheckoutOpen(false);}} 
      />
      
    </BrowserRouter>
  );
}

export default App;