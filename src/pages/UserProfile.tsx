import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Se redirige automáticamente
  }

  // Convertir los datos del contexto a la interfaz UserData
  const userData: UserData = {
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    dni: user.dni || 0,
    telefono: user.telefono || 0,
    estado: user.estado || 1,
    rol: {
      nombre: user.rol
    }
  };

  const getEstadoText = (estado: number) => {
    return estado === 1 ? 'Activo' : 'Inactivo';
  };

  const getEstadoColor = (estado: number) => {
    return estado === 1 ? 'text-green-600' : 'text-red-600';
  };

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
            {/* Profile Header */}
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
                {/* Personal Information */}
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

                {/* Contact & Account Information */}
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
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    Volver al Inicio
                  </button>
                  <button
                    onClick={() => navigate('/bus-reservation')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Reservar Viaje
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
