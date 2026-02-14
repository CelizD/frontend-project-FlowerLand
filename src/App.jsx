import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { flowers } from './data'; 

// --- COMPONENTES ---
import Header from './Components/Header'; 
import Footer from './Components/Footer';
import CartSidebar from './Components/CartSidebar';
import CheckoutModal from './Components/CheckoutModal';
import LoginModal from './Components/LoginModal'; 
import WhatsAppBtn from './Components/WhatsAppBtn';
import ScrollToTop from './Components/ScrollToTop'; 

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

  // 1. CARGA DE PRODUCTOS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) throw new Error();
        const data = await response.json();
        setProducts(data); 
      } catch (error) {
        setProducts(flowers || []); 
      }
    };
    fetchProducts();
  }, []);

  // 2. LÓGICA DE CARRITO
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

  const totalCalculado = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);

  return (
    <BrowserRouter>
      {/* Hace que la página siempre suba al inicio al cambiar de ruta */}
      <ScrollToTop />

      {/* HEADER GLOBAL */}
      <Header 
        cartCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginModalOpen(true)}
        user={user}
        onLogout={() => { setUser(null); localStorage.removeItem("flowerUser"); }}
      />

      <div className="flex flex-col min-h-screen">
        <main className="flex-grow pt-20 bg-gray-50">
          <Routes>
            {/* Página Principal */}
            <Route path="/" element={<Tienda products={products} addToCart={addToCart} />} />
            
            {/* Rutas de Ayuda e Información (Capturas de Footer) */}
            <Route path="/cobertura" element={
              <InfoPage title="Cobertura en Tijuana" type="cobertura" />
            } />
            <Route path="/como-comprar" element={
              <InfoPage title="¿Cómo comprar?" content="Navega por nuestro catálogo, elige tus flores favoritas, selecciona la zona de Tijuana y realiza tu pago seguro. ¡Es así de simple!" />
            } />
            <Route path="/envios" element={
              <InfoPage title="Política de Envíos" content="Entregamos de lunes a domingo. Nuestros repartidores se aseguran de que cada arreglo llegue en perfectas condiciones hasta la puerta de tu hogar." />
            } />
            <Route path="/preguntas-frecuentes" element={
              <InfoPage title="Preguntas Frecuentes" content="¿Aceptan efectivo? ¿Tienen entregas el mismo día? Aquí resolvemos todas tus dudas para que compres con confianza." />
            } />

            {/* Rutas de Acerca de Nosotros */}
            <Route path="/historia" element={
              <InfoPage title="Nuestra Historia" content="Nacimos del amor por la naturaleza y el deseo de llevar belleza a cada rincón de Tijuana. Somos una florería local comprometida con la frescura." />
            } />
            <Route path="/garantia" element={
              <InfoPage title="Garantía de Calidad" content="Si tus flores no llegan frescas o el diseño no es lo que esperabas, lo solucionamos. Tu satisfacción es nuestra única prioridad." />
            } />
            <Route path="/opiniones" element={
              <InfoPage title="Opiniones de Clientes" content="Cientos de sonrisas entregadas nos respaldan. Gracias por permitirnos ser parte de tus momentos especiales." />
            } />
          </Routes>
        </main>

        {/* FOOTER ÚNICO */}
        <Footer />
      </div>

      <WhatsAppBtn />

      {/* SIDEBAR Y MODALES */}
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
        onConfirm={() => {setCartItems([]); setIsCheckoutOpen(false); alert("¡Pedido realizado con éxito!");}} 
      />
      
    </BrowserRouter>
  );
}

export default App;