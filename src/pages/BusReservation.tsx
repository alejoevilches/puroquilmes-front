import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import ViajesList from '../components/ViajesList';
import ReservaForm from '../components/ReservaForm';
import MisReservas from '../components/MisReservas';
import Button from '../components/Button';

interface Viaje {
  viaje_id: number;
  num_viaje: number;
  lugar_disponible: number;
  fecha: string;
  estado: boolean;
  bus: {
    bus_id: number;
  };
}

export default function BusReservation() {
  const { user } = useAuth();
  const [showReservaForm, setShowReservaForm] = useState(false);
  const [selectedViaje, setSelectedViaje] = useState<Viaje | null>(null);
  const [activeTab, setActiveTab] = useState<'viajes' | 'reservas'>('viajes');
  const [reservaExitosa, setReservaExitosa] = useState(false);

  const handleReservar = (viaje: Viaje) => {
    setSelectedViaje(viaje);
    setShowReservaForm(true);
  };

  const handleReservaExitosa = () => {
    setShowReservaForm(false);
    setSelectedViaje(null);
    setReservaExitosa(true);
    setActiveTab('reservas');
    
    // Ocultar el mensaje de éxito después de 3 segundos
    setTimeout(() => setReservaExitosa(false), 3000);
  };

  const handleCancelarReserva = () => {
    setShowReservaForm(false);
    setSelectedViaje(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reserva de Viajes</h1>
              <p className="mt-2 text-gray-600">
                Encuentra y reserva tu próximo viaje en bus
              </p>
            </div>
            {user && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Bienvenido,</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('viajes')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'viajes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Viajes Disponibles
            </button>
            <button
              onClick={() => setActiveTab('reservas')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reservas'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mis Reservas
            </button>
          </nav>
        </div>

        {/* Mensaje de reserva exitosa */}
        {reservaExitosa && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  ¡Reserva realizada con éxito! Revisa tus reservas para más detalles.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contenido de las tabs */}
        {activeTab === 'viajes' ? (
          <div>
            {!user ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Acceso requerido</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Necesitas iniciar sesión para poder reservar viajes.
                  </p>
                  <div className="mt-6">
                    <Button variant="primary">
                      Iniciar Sesión
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <ViajesList onReservar={handleReservar} />
            )}
          </div>
        ) : (
          <div>
            <MisReservas />
          </div>
        )}
      </div>

      {/* Modal de formulario de reserva */}
      {showReservaForm && selectedViaje && (
        <ReservaForm
          viaje={selectedViaje}
          onReservaExitosa={handleReservaExitosa}
          onCancelar={handleCancelarReserva}
        />
      )}
    </div>
  );
} 