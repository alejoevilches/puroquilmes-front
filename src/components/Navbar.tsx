import Button from "./Button"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

export default function Navbar(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuth();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/search-results');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navClass = typeof window !== 'undefined' && window.location.pathname === '/bus-reservation'
    ? "flex flex-row justify-between items-center w-full py-6 px-4 md:px-10 absolute top-0 z-10 bg-black"
    : "flex flex-row justify-between items-center w-full py-6 px-4 md:px-10 absolute top-0 z-10 bg-black/30 backdrop-blur-xs";

  if (isLoading) {
    return (
      <nav className={navClass}>
        <p className="text-white">Puro Quilmes</p>
        <div className="text-white">Cargando...</div>
      </nav>
    );
  }

  return(
    <nav className={navClass}>
      <p className="text-white">Puro Quilmes</p>
      
      <button 
        className="md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <div className="hidden md:flex items-center gap-4">
        <form onSubmit={handleSearch}>
          <input 
            type="search" 
            name="search" 
            id="search" 
            placeholder="Busca tus lugares favoritos"
            className="w-sm content-center px-4 py-2 rounded-full border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-white" 
          />
        </form>
        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <span className="text-white text-sm">
                Hola, {user.nombre} {user.apellido}
              </span>
              <Link to="/profile">
                <Button className="bg-blue-600 hover:bg-blue-700">Mi Perfil</Button>
              </Link>
              <Button onClick={handleLogout}>Cerrar sesión</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button>Iniciar sesion</Button>
              </Link>
              <Link to="/register">
                <Button>Crear cuenta</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className={`md:hidden fixed top-[72px] left-0 right-0 bg-black/95 backdrop-blur-md p-4 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSearch}>
            <input 
              type="search" 
              name="search-mobile" 
              id="search-mobile" 
              placeholder="Busca tus lugares favoritos"
              className="w-full px-4 py-2 rounded-full border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-white" 
            />
          </form>
          <div className="flex flex-col gap-3">
            {user ? (
              <>
                <span className="text-white text-center">
                  Hola, {user.nombre} {user.apellido}
                </span>
                <Link to="/profile" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Mi Perfil</Button>
                </Link>
                <Button onClick={handleLogout} className="w-full">Cerrar sesión</Button>
              </>
            ) : (
              <>
                <Link to="/login" className="w-full">
                  <Button className="w-full">Iniciar sesion</Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button className="w-full">Crear cuenta</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}