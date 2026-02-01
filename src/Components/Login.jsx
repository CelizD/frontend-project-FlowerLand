import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 lowercase tracking-tighter">flowerland</h1>
        <p className="text-gray-500 mb-8 lowercase text-sm">ingresa para continuar</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">usuario</label>
            <input 
              type="text" 
              className="w-full border-b-2 border-gray-200 py-3 text-xl text-gray-900 focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
              placeholder="ej. daniel"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          
          <button 
            type="submit" 
            className="mt-6 bg-black text-white py-4 rounded-xl font-bold lowercase hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!username.trim()}
          >
            entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;