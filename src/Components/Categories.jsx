import React from 'react';

function Categories() {
  const cats = [
    { name: "Cumpleaños", img: "https://images.unsplash.com/photo-1557053910-d9eade4150c7?auto=format&fit=crop&q=80&w=300" },
    { name: "Amor", img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=300" },
    { name: "Condolencias", img: "https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?auto=format&fit=crop&q=80&w=300" },
    { name: "Aniversario", img: "https://images.unsplash.com/photo-1523694576729-dc99e9c0f9b4?auto=format&fit=crop&q=80&w=300" },
    { name: "Mejórate", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=300" },
    { name: "Graduación", img: "https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&q=80&w=300" },
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">
          Busca por ocasión
        </p>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {cats.map((cat, index) => (
            <div key={index} className="group flex flex-col items-center cursor-pointer">
              {/* El Círculo */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-black p-1 transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              {/* El Texto */}
              <span className="mt-3 text-xs md:text-sm font-serif font-medium text-gray-900 group-hover:text-gray-500 transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;