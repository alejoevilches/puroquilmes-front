import type { Lugar } from '../types/Lugar';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Zone {
  id: number;
  nombre: string;
}

interface PlaceType {
  id: number;
  nombre: string;
}

interface UserData {
  nombre: string;
  apellido: string;
  email: string;
  dni: number;
  telefono: number;
  estado: number;
  rol: {
    nombre: string;
  };
}

export default function UserProfile() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [selectedLugarId, setSelectedLugarId] = useState<number | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zones, setZones] = useState<Zone[]>([
    { id: 2, nombre: 'Ezpeleta' },
    { id: 3, nombre: 'San Francisco Solano' },
    { id: 1, nombre: 'Quilmes Centro' },
  ]);
  const [placeTypes, setPlaceTypes] = useState<PlaceType[]>([]);

  useEffect(() => {
    const fetchLugares = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/lugares');
        if (!response.ok) throw new Error('Error al obtener lugares');
        const data: Lugar[] = await response.json();
        console.log(data);
        setLugares(data);
      } catch (error) {
        console.error('Error al obtener lugares:', error);
      }
    };
    fetchLugares();
    if (!user) {
      navigate('/login');
      return;
    }
    setPlaceTypes([
      { id: 1, nombre: 'Bar' },
      { id: 2, nombre: 'Pizzería' },
    ]);
  }, [user, navigate]);

  const handleAddPlace = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("[ADD PLACE] Form submitted");

  const formData = new FormData(event.currentTarget);

  // Armamos los parámetros como URL-encoded
  const params = new URLSearchParams();
  params.append("nombre", formData.get("nombre") as string);
  params.append("ubicacion", formData.get("ubicacion") as string);
  params.append("descripcion", formData.get("descripcion") as string);
  params.append("zonaId", formData.get("zonaId") as string);
  params.append("tipoLugarId", formData.get("tipoLugarId") as string);

  console.log("[ADD PLACE] Data armada para enviar:", params.toString());

  try {
    const response = await fetch("http://localhost:8080/api/lugares", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    console.log("[ADD PLACE] Status:", response.status, response.statusText);

    const text = await response.text();
    console.log("[ADD PLACE] Body:", text);

    if (response.ok) {
      alert("Lugar agregado correctamente");
      setIsModalOpen(false);
    } else {
      alert("Error al agregar el lugar");
    }
  } catch (error) {
    console.error("[ADD PLACE] Fetch error:", error);
    alert("Error en la conexión con el servidor");
  }
};

  console.log("[PROFILE] user desde contexto:", user);
  const rolNombre =
    typeof user?.rol === 'string'
      ? user.rol
      : (user.rol as { nombre: string })?.nombre ?? "Usuario";

  const userData: UserData = {
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    dni: user.dni || 0,
    telefono: user.telefono || 0,
    estado: user.estado || 1,
    rol: { nombre: rolNombre },
  };

  const getEstadoText = (estado: number) => estado === 1 ? 'Activo' : 'Inactivo';
  const getEstadoColor = (estado: number) => estado === 1 ? 'text-green-600' : 'text-red-600';

  console.log("[DEBUG] zones:", zones);
  console.log("[DEBUG] placeTypes:", placeTypes);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Mi Perfil</h1>
            <p className="text-gray-600">Gestiona tu información personal</p>
            {(userData.dni === 0 || userData.telefono === 0) && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-blue-700">
                  💡 Algunos datos se obtienen de las cookies de sesión. Para ver información completa, inicia sesión nuevamente.
                </p>
              </div>
            )}
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
                  {userData.nombre.charAt(0).toUpperCase()}{userData.apellido.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{userData.nombre} {userData.apellido}</h2>
                  <p className="text-blue-100">{userData.email}</p>
                  <div className="flex items-center mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      userData.estado === 1 
                        ? 'bg-green-500/20 text-green-100' 
                        : 'bg-red-500/20 text-red-100'
                    }`}>
                      {getEstadoText(userData.estado)}
                    </span>
                    <span className="ml-3 px-3 py-1 bg-white/20 rounded-full text-sm">
                      {userData.rol.nombre}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Información Personal
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Nombre:</span>
                      <span className="text-gray-800 font-semibold">{userData.nombre}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Apellido:</span>
                      <span className="text-gray-800 font-semibold">{userData.apellido}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Email:</span>
                      <span className="text-gray-800 font-semibold">{userData.email}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Información de Contacto
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">DNI:</span>
                      <span className="text-gray-800 font-semibold">
                        {userData.dni > 0 ? userData.dni : 'No disponible'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Teléfono:</span>
                      <span className="text-gray-800 font-semibold">
                        {userData.telefono > 0 ? userData.telefono : 'No disponible'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Estado:</span>
                      <span className={`font-semibold ${getEstadoColor(userData.estado)}`}>
                        {getEstadoText(userData.estado)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Rol:</span>
                      <span className="text-gray-800 font-semibold">{userData.rol.nombre}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={() => navigate('/')} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
                    Volver al Inicio
                  </button>
                  <button onClick={() => navigate('/bus-reservation')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Reservar Viaje
                  </button>
                  <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Agregar Lugar
                  </button>
                  <button onClick={() => setIsDeleteModalOpen(true)} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                    Eliminar Lugar
                  </button>
                </div>
              </div>
      {/* Modal Eliminar Lugar */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Eliminar Lugar</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!selectedLugarId) {
                  alert('Selecciona un lugar');
                  return;
                }
                console.log("[DELETE PLACE] Lugar ID seleccionado:", selectedLugarId);
                try {
                  const response = await fetch(`http://localhost:8080/api/lugares/${selectedLugarId}`, {
                    method: 'DELETE',
                  });
                  if (response.ok) {
                    alert('Lugar eliminado correctamente');
                    setLugares(lugares.filter(l => l.id !== selectedLugarId));
                    setIsDeleteModalOpen(false);
                  } else {
                    alert('Error al eliminar el lugar');
                  }
                } catch (error) {
                  alert('Error en la conexión con el servidor');
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700">Selecciona un lugar</label>
                <select
                  className="w-full border rounded p-2"
                  value={selectedLugarId !== null && !isNaN(selectedLugarId) ? String(selectedLugarId) : ''}
                  onChange={e => {
                    const value = e.target.value;
                    setSelectedLugarId(value === '' ? null : Number(value));
                  }}
                  required
                >
                  <option value="">-- Selecciona --</option>
                  {lugares.map(lugar => (
                    <option key={lugar.id} value={lugar.id}>{lugar.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded mr-2">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">
                  Eliminar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Agregar Lugar</h2>
            <form onSubmit={handleAddPlace}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input name="nombre" className="w-full border rounded p-2" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ubicación</label>
                <input name="ubicacion" className="w-full border rounded p-2" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Descripción</label>
                <textarea name="descripcion" className="w-full border rounded p-2" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Zona</label>
                <select name="zonaId" className="w-full border rounded p-2" required>
                  <option value="">Seleccione una zona</option>
                  {zones.map((zone) => (
                    <option key={zone.id} value={zone.id}>{zone.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Tipo de Lugar</label>
                <select name="tipoLugarId" className="w-full border rounded p-2" required>
                  {placeTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded mr-2">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
