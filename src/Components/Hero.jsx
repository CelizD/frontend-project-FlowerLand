import { useState, useEffect } from 'react';
// ¡YA NO IMPORTAMOS EL LOGO!

function Hero() {
  const words = ["Espacios", "Eventos", "Momentos", "Sentimientos"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(word.substring(0, displayText.length + 1));
        if (displayText.length === word.length) {
          setTimeout(() => setIsDeleting(true), 1500); 
        }
      } else {
        setDisplayText(word.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, words]);


  return (
    // Cambiamos el color de texto base a un gris cálido
    <div id="inicio" className="relative min-h-screen flex items-center justify-center text-center text-[#78716c] overflow-hidden">
      
      {/* 1. Imagen de Fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1490750967868-58cb75069faf?auto=format&fit=crop&w=1920&q=80')",
          backgroundAttachment: "fixed"
        }}
      >
        {/* Overlay cálido y suave para que combine con la tarjeta crema */}
        <div className="absolute inset-0 bg-[#f0e6dd]/50 mix-blend-multiply"></div>
      </div>

      {/* 2. Tarjeta Elegante (Estilo Papel Crema) */}
      {/* Quitamos el efecto vidrio y ponemos colores sólidos de la imagen */}
      <div className="relative z-10 max-w-4xl mx-4 px-8 py-16 md:px-12 md:py-24 rounded-[3rem] border-2 border-[#eaddcf] bg-[#fdfbf7] shadow-2xl shadow-[#eaddcf]/40 animate-fade-in-up flex flex-col items-center">
        
        {/* --- YA NO HAY IMAGEN AQUÍ --- */}

        {/* Badge con tonos verdes (hojas del logo) */}
        <span className="inline-block py-2 px-4 rounded-full bg-[#e8f5e9] text-[#2e7d32] text-sm font-bold tracking-[0.2em] uppercase mb-8 border border-[#c8e6c9]">
          Naturaleza & Diseño
        </span>
        
        {/* Título Principal (Tono Dorado/Bronce del texto "Flowerland") */}
        <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight text-[#a67c5b]">
          Dale Vida a tus <br/>
          {/* Texto Animado (Tono Rosa Dorado de la flor) */}
          <span className="text-[#d4af97] border-r-4 border-[#d4af97] pr-2 animate-pulse">
            {displayText}
          </span>
        </h2>
        
        {/* Párrafo (Gris cálido) */}
        <p className="text-xl text-[#78716c] mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Encuentra la armonía perfecta con nuestra selección exclusiva de flores frescas y arreglos artesanales para cualquier ocasión.
        </p>

        {/* Botones con la nueva paleta */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 w-full">
          {/* Botón Principal (Rosa Dorado) */}
          <a 
            href="#galeria" 
            className="group relative px-10 py-4 bg-[#d4af97] rounded-full text-lg font-bold text-white shadow-xl overflow-hidden transition-all hover:scale-105 hover:bg-[#c09a83] hover:shadow-[#d4af97]/50"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span>Ver Catálogo</span>
          </a>
          
          {/* Botón Secundario (Borde Dorado) */}
          <a 
            href="#contacto" 
            className="px-10 py-4 bg-transparent border-2 border-[#a67c5b] rounded-full text-lg font-bold text-[#a67c5b] transition-all hover:bg-[#a67c5b] hover:text-white hover:scale-105 shadow-md"
          >
            Contáctanos
          </a>
        </div>

      </div>
    </div>
  );
}

export default Hero;