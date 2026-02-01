import { useState } from 'react';

function Header({ 
  cartCount, 
  onCartClick, 
  onOrdersClick, 
  user, 
  onLogout, 
  isAdminMode, 
  onToggleAdmin 
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white shadow-md w-full sticky top-0 z-[50]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Título del sitio */}
        <h1 className="text-2xl font-bold tracking-wider hover:text-blue-300 transition">
          <a href="#inicio">FlowerLand</a>
        </h1>

        {/* Botón Hamburguesa (Móvil) */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 focus:outline-none text-gray-300 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* --- MENÚ DE ESCRITORIO (PC) --- */}
        <nav className="hidden md:flex gap-6 items-center">
          
          {/* Enlaces Principales */}
          <a href="#inicio" className="text-gray-300 hover:text-white transition text-xs font-bold lowercase tracking-wide">inicio</a>
          <a href="#galeria" className="text-gray-300 hover:text-white transition text-xs font-bold lowercase tracking-wide">galería</a>
          
          {/* Botón Mis Pedidos */}
          <button 
            onClick={onOrdersClick}
            className="text-gray-300 hover:text-yellow-400 transition text-xs font-bold lowercase tracking-wide"
          >
            mis pedidos
          </button>

          {/* Botón Modo Admin (Toggle) */}
          <button 
            onClick={onToggleAdmin}
            className={`text-[10px] font-bold px-2 py-1 rounded transition border lowercase tracking-wider ml-2 ${
              isAdminMode 
                ? "bg-white text-gray-900 border-white" 
                : "bg-transparent text-gray-500 border-gray-600 hover:text-white hover:border-white"
            }`}
          >
            {isAdminMode ? "salir admin" : "admin"}
          </button>

          {/* Sección de Usuario */}
          <div className="flex items-center gap-3 border-l border-gray-600 pl-4 ml-2">
            <span className="text-xs text-gray-500 lowercase">
              hola, <span className="text-gray-200 font-bold">{user}</span>
            </span>
            <button 
              onClick={onLogout} 
              className="text-[10px] text-red-400 hover:text-red-300 font-bold lowercase border border-red-900/30 bg-red-900/10 px-2 py-1 rounded hover:bg-red-900/30 transition"
            >
              salir
            </button>
          </div>

          {/* Icono del Carrito (SVG) */}
          <div 
            className="relative cursor-pointer hover:text-blue-300 transition p-1 ml-2 group"
            onClick={onCartClick} 
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            
            {/* Badge contador */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-gray-800 group-hover:bg-blue-500 transition">
                {cartCount}
              </span>
            )}
          </div>
        </nav>
      </div>

      {/* --- MENÚ MÓVIL (Celular) --- */}
      {isOpen && (
        <nav className="md:hidden bg-gray-900 p-6 flex flex-col gap-6 border-t border-gray-700 animate-fade-in-up">
          <div className="flex flex-col gap-4">
            <a href="#inicio" className="text-gray-300 hover:text-white font-bold lowercase text-sm" onClick={() => setIsOpen(false)}>inicio</a>
            <a href="#galeria" className="text-gray-300 hover:text-white font-bold lowercase text-sm" onClick={() => setIsOpen(false)}>galería</a>
            <button className="text-gray-300 hover:text-yellow-400 font-bold lowercase text-sm text-left" onClick={() => { setIsOpen(false); onOrdersClick(); }}>mis pedidos</button>
          </div>

          <div className="border-t border-gray-700"></div>

          {/* Opciones de Admin y Usuario en Móvil */}
          <div className="flex flex-col gap-4">
             <button 
              onClick={() => { setIsOpen(false); onToggleAdmin(); }}
              className={`text-xs font-bold py-2 rounded transition border lowercase text-center ${
                isAdminMode ? "bg-white text-gray-900" : "text-gray-400 border-gray-600"
              }`}
            >
              {isAdminMode ? "salir modo admin" : "entrar modo admin"}
            </button>

            <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
               <span className="text-xs text-gray-400 lowercase">usuario: <span className="text-white font-bold">{user}</span></span>
               <button onClick={onLogout} className="text-xs text-red-400 font-bold lowercase">cerrar sesión</button>
            </div>
          </div>
          
          {/* Botón Carrito Móvil */}
          <div 
            className="flex items-center justify-between bg-black p-4 rounded-xl cursor-pointer hover:bg-gray-800 transition border border-gray-700"
            onClick={() => { setIsOpen(false); onCartClick(); }}
          >
            <div className="flex items-center gap-3 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="font-bold text-sm lowercase">ver carrito</span>
            </div>
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">{cartCount} items</span>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;