import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- CONFIGURACIÓN DEL MEGA MENÚ ---
const menuData = [
  {
    id: 1,
    title: "San Valentín", // ACTUALIZADO (Estilo Foto 2)
    path: "/san-valentin",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400",
    viewAll: { text: "Ver todo San Valentín", path: "/san-valentin" }, // NUEVO
    columns: [
      {
        header: "Flores y Plantas",
        items: ["Rosas Rojas", "Tulipanes y Combinados", "Orquídeas y Plantas"]
      },
      {
        header: "Postres y Vinos",
        items: ["Pasteles y Muffins", "Brownies y Chocolates", "Botanas y Dulces", "Vinos"]
      },
      {
        header: "Globos y Peluches",
        items: ["Globos", "Peluches"]
      },
      {
        header: "Personalizados",
        items: ["Tazas y Marcos", "Combos", "Joyería"]
      }
    ]
  },
  {
    id: 2,
    title: "Cumpleaños",
    path: "/cumpleanos",
    image: "https://images.unsplash.com/photo-1557053910-d9eade4150c7?auto=format&fit=crop&q=80&w=400",
    viewAll: { text: "Ver todo Cumpleaños", path: "/cumpleanos" }, // NUEVO
    columns: [
      { header: "Combos y Globos", items: ["Combos", "Globos"] },
      { header: "Flores y Plantas", items: ["Flores", "Plantas"] },
      { header: "Pasteles y Postres", items: ["Pasteles", "Brownies y Galletas"] },
      { header: "Para quién", items: ["Para Ella", "Para Él"] },
      { header: "Regalos desde $249", items: ["Ver catálogo económico"] }
    ]
  },
  {
    id: 3,
    title: "Ocasiones",
    path: "/ocasiones",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400",
    viewAll: { text: "Ver todas las Ocasiones", path: "/ocasiones" }, // NUEVO
    columns: [
      {
        header: "Celebraciones",
        items: ["Amor/Aniversario", "Bride to be", "Cumpleaños", "Graduación", "Nacimiento"]
      },
      {
        header: "Motivos especiales",
        items: ["Gracias", "Perdón"]
      },
      {
        header: "Momentos difíciles",
        items: ["Condolencias", "Mejórate pronto"]
      }
    ]
  },
  {
    id: 4,
    title: "Flores y plantas", // NUEVO MENÚ (Estilo Foto 4)
    path: "/flores-plantas",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=400",
    viewAll: { text: "Ver todo Flores y Plantas", path: "/flores-plantas" }, // NUEVO
    columns: [
      {
        header: "Flores",
        items: ["Combinados", "Gerberas", "Girasoles", "Lilys y Stargazer", "Orquídeas", "Rosas", "Tulipanes"]
      },
      {
        header: "Plantas",
        items: ["Combos con plantas", "Orquídeas", "Plantas con regalos", "Plantas medianas"]
      },
      {
        header: "Premium",
        items: ["Flores premium"]
      }
    ]
  }
];

const phrases = ["Shop", "Love", "Art", "Life", "Land"];

function Header({ cartCount, onCartClick, onOrdersClick, onLoginClick, user, onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // --- LOGO ANIMADO ---
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) { setReverse(true); return; }
    if (subIndex === 0 && reverse) { setReverse(false); setIndex((prev) => (prev + 1) % phrases.length); return; }
    let timeoutValue = 150;
    if (reverse) timeoutValue = 75;
    if (subIndex === phrases[index].length && !reverse) timeoutValue = 2000;
    const timeout = setTimeout(() => { setSubIndex((prev) => prev + (reverse ? -1 : 1)); }, timeoutValue);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => { setText(phrases[index].substring(0, subIndex)); }, [subIndex, index]);

  // --- SCROLL ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled || hoveredMenu 
            ? "bg-white border-gray-200 py-0 shadow-sm" 
            : "bg-white/90 backdrop-blur-md border-transparent py-4"
        }`}
        onMouseLeave={() => setHoveredMenu(null)}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* LOGO */}
          <Link to="/" className="z-50 flex items-center gap-2 group">
             <h1 className="text-2xl font-serif tracking-tight text-gray-900 cursor-pointer flex items-center">
               <span>Flower</span>
               <span className="italic text-gray-400 ml-1 min-w-[50px]">{text}</span>
               <span className="w-0.5 h-6 bg-gray-400 animate-pulse ml-0.5"></span>
             </h1>
          </Link>

          {/* MEGA MENÚ (Desktop) */}
          <nav className="hidden lg:flex items-center h-full">
            <ul className="flex h-full gap-8">
              <li className="h-full flex items-center"><Link to="/" className="text-sm font-bold uppercase tracking-widest hover:text-pink-600 transition-colors">Inicio</Link></li>
              
              {menuData.map((menu) => (
                <li key={menu.id} className="h-full flex items-center group cursor-pointer relative" onMouseEnter={() => setHoveredMenu(menu.id)}>
                  <span className={`text-sm font-bold uppercase tracking-widest transition-colors py-8 border-b-2 ${hoveredMenu === menu.id ? "text-pink-600 border-pink-600" : "text-gray-900 border-transparent"}`}>
                    {menu.title}
                  </span>
                </li>
              ))}
              
              <li className="h-full flex items-center"><a href="#galeria" className="text-sm font-bold uppercase tracking-widest hover:text-pink-600 transition-colors">Tienda</a></li>
            </ul>
          </nav>

          {/* ICONOS DERECHA */}
          <div className="flex items-center gap-4 z-50">
            
            {/* 1. ICONO USUARIO + MENÚ DESPLEGABLE */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 text-gray-900 hover:text-pink-600 transition-colors rounded-full hover:bg-gray-100"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in-up">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100 mb-1">
                        <p className="text-xs text-gray-400 uppercase">Hola,</p>
                        <p className="font-bold text-gray-900 truncate">{user}</p>
                      </div>
                      <button onClick={onOrdersClick} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-pink-600">Mis Pedidos</button>
                      <button onClick={() => {onLogout(); setIsUserMenuOpen(false);}} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50">Cerrar Sesión</button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => { onLoginClick(); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                      >
                        Iniciar sesión
                      </button>
                      <button 
                        onClick={() => { onLoginClick(); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                      >
                        Crear cuenta
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* 2. CARRITO */}
            <button onClick={onCartClick} className="relative p-2 text-gray-900 hover:text-pink-600 transition-colors rounded-full hover:bg-gray-100">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-pink-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburguesa (Mobile) */}
            <button className="lg:hidden p-2 text-gray-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            </button>
          </div>
        </div>

        {/* --- DESPLEGABLE MEGA MENÚ --- */}
        <div 
          className={`absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl transition-all duration-300 ease-in-out overflow-hidden z-40 ${hoveredMenu ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible"}`}
          onMouseEnter={() => setHoveredMenu(hoveredMenu)} onMouseLeave={() => setHoveredMenu(null)}
        >
          {menuData.map((menu) => (
             <div key={menu.id} className={`${hoveredMenu === menu.id ? "block" : "hidden"}`}>
               <div className="max-w-[1400px] mx-auto px-8 py-10 flex justify-between">
                   <div className="flex-1 flex flex-col justify-between">
                     <div className="grid grid-cols-4 gap-8">
                       {menu.columns.map((col, idx) => (
                         <div key={idx}>
                           <h3 className="font-bold text-gray-900 mb-4 font-serif text-lg border-b border-gray-100 pb-2 inline-block">{col.header}</h3>
                           <ul className="space-y-3">{col.items.map((item, i) => (<li key={i}><a href="#" className="text-sm text-gray-500 hover:text-pink-600 hover:translate-x-1 transition-all inline-block">{item}</a></li>))}</ul>
                         </div>
                       ))}
                     </div>
                     
                     {/* ENLACE "VER TODO" */}
                     {menu.viewAll && (
                       <div className="mt-8 pt-4 border-t border-gray-100">
                         <Link to={menu.viewAll.path} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-900 hover:text-pink-600 transition-colors">
                           {menu.viewAll.text}
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                         </Link>
                       </div>
                     )}
                   </div>

                   <div className="w-[300px] ml-12 hidden md:block">
                     <div className="relative h-64 rounded-xl overflow-hidden group shadow-lg">
                       <img src={menu.image} alt={menu.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                       <div className="absolute bottom-6 left-6 text-white"><p className="font-serif text-2xl">{menu.title}</p></div>
                     </div>
                   </div>
               </div>
             </div>
          ))}
        </div>

        {/* --- MENÚ MÓVIL --- */}
        <div className={`fixed inset-0 bg-white z-50 lg:hidden transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
           <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-serif text-gray-900">Menú</h2>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <div className="space-y-6 flex-1 overflow-y-auto">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-xl font-bold text-gray-900">Inicio</Link>
                {menuData.map((menu) => (
                  <div key={menu.id} className="border-b border-gray-100 pb-4">
                    <p className="text-pink-600 font-bold uppercase text-xs tracking-widest mb-3">{menu.title}</p>
                    <div className="pl-4 space-y-2">{menu.columns.map((col, i) => col.items.map((item, j) => (<a key={`${i}-${j}`} href="#" className="block text-gray-600 text-sm">{item}</a>)))}</div>
                    {/* Ver todo Móvil */}
                    {menu.viewAll && (
                      <Link to={menu.viewAll.path} onClick={() => setIsMobileMenuOpen(false)} className="block mt-3 text-black font-bold text-sm">
                        {menu.viewAll.text} →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-gray-100">
                {user ? (
                   <button onClick={onLogout} className="w-full py-3 text-red-500 font-bold uppercase bg-gray-50 rounded-lg">Cerrar Sesión</button>
                ) : (
                   <button onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }} className="w-full py-3 text-white bg-black font-bold uppercase rounded-lg">Iniciar Sesión / Registrarse</button>
                )}
              </div>
           </div>
        </div>
      </header>
    </>
  );
}

export default Header;