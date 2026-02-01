import { useState, useEffect } from 'react';
import Header from './Components/header';
import Hero from './Components/Hero';
import Services from './Components/Services';
import Gallery from './Components/Gallery';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import WhatsAppBtn from './Components/WhatsAppBtn';
import CartSidebar from './Components/CartSidebar';
import CheckoutModal from './Components/CheckoutModal';
import OrdersModal from './Components/OrdersModal';
import Login from './Components/Login';
import AdminPanel from './Components/AdminPanel'; // <--- Importamos Admin

// Base de datos inicial (por defecto)
const INITIAL_PRODUCTS = [
  { id: 1, name: "rosa roja", price: "$150", category: "romance", img: "https://images.unsplash.com/photo-1548695607-9c73430ba065?auto=format&fit=crop&w=800&q=80", description: "un símbolo de amor profundo.", care: "cambiar agua cada dos días." },
  { id: 2, name: "girasol", price: "$120", category: "jardín", img: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=800&q=80", description: "flores vibrantes solares.", care: "luz directa." },
  { id: 3, name: "tulipán", price: "$180", category: "primavera", img: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80", description: "elegancia y sencillez.", care: "lugar fresco." }
];

function App() {
  const [user, setUser] = useState(() => localStorage.getItem("flowerUser") || null);
  
  // --- ESTADO MAESTRO DE PRODUCTOS (Persistente) ---
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("flowerProducts");
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // --- ESTADO DE MODO ADMIN ---
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => { localStorage.setItem("flowerProducts", JSON.stringify(products)); }, [products]);
  useEffect(() => { if (user) localStorage.setItem("flowerUser", user); }, [user]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [cartItems, setCartItems] = useState([]); // (simplificado para el ejemplo)
  const [orders, setOrders] = useState([]);

  // ... (Tus funciones de addToCart, remove, etc. siguen igual, solo omítelas aquí para ahorrar espacio visual) ...
  // PERO, necesitamos las funciones CRUD para el admin:

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    showNotification("producto creado");
  };

  const handleDeleteProduct = (id) => {
    if(window.confirm("¿seguro que quieres eliminar este producto?")) {
      setProducts(products.filter(p => p.id !== id));
      showNotification("producto eliminado");
    }
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    showNotification("cambios guardados");
  };

  // Función auxiliar de notificaciones (la tuya)
  const showNotification = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  
  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[200] animate-fade-in-up">
           <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl border border-gray-700">
            <p className="font-bold text-xs uppercase tracking-widest">{toast}</p>
          </div>
        </div>
      )}

      {/* HEADER: Le pasamos el control para cambiar a modo Admin */}
      <Header 
        cartCount={cartItems.length} 
        onCartClick={() => setIsCartOpen(true)} 
        onOrdersClick={() => setIsOrdersOpen(true)} 
        user={user} 
        onLogout={() => { setUser(null); setIsAdminMode(false); }}
        isAdminMode={isAdminMode}                 // <--- Nuevo
        onToggleAdmin={() => setIsAdminMode(!isAdminMode)} // <--- Nuevo
      /> 

      {/* RENDERIZADO CONDICIONAL: ¿Tienda o Admin? */}
      {isAdminMode ? (
        <AdminPanel 
          products={products} 
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleEditProduct}
        />
      ) : (
        <>
          <Hero />
          <Services />
          {/* IMPORTANTE: Gallery ahora recibe los productos como Prop, ya no tiene datos fijos */}
          <Gallery addToCart={(flower) => setCartItems([...cartItems, flower])} products={products} /> 
          <Contact />
        </>
      )}

      {/* Modales siempre disponibles */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} removeFromCart={(i) => setCartItems(cartItems.filter((_, idx) => idx !== i))} onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} />
      {/* ... tus otros modales ... */}
      <Footer />
    </div>
  );
}

export default App;