function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
        
        {/* Lado Izquierdo: Marca y Copy */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">FlowerLand</h3>
          <p className="text-sm">© 2026 FlowerLand. Todos los derechos reservados.</p>
        </div>

        {/* Lado Derecho: Enlaces sociales (ficticios) */}
        <div className="flex gap-6">
          <a href="#" className="hover:text-blue-400 transition">Instagram</a>
          <a href="#" className="hover:text-blue-400 transition">Facebook</a>
          <a href="#" className="hover:text-blue-400 transition">Twitter</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;