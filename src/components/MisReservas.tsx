import React, { useState, useEffect, useContext } from 'react';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';

interface Reserva {
  pasajero_id: number;
  cantidad_pasajeros: number;
  estado: boolean;
  viaje: {
    viaje_id: number;
    num_viaje: number;
    fecha: string;
    lugar_disponible: number;
    bus: {
      bus_id: number;
    };
  };
}

export default function MisReservas() {
  const { user } = useAuth();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchReservas();
    }
  }, [user]);

  const fetchReservas = async () => {
    if (!user) {
      console.log('[DEBUG FRONT] fetchReservas: usuario no logueado');
      return;
    }

    try {
      setLoading(true);
      const url = `http://localhost:8080/api/reservas/usuario/${user.id}`;
      console.log('[DEBUG FRONT] fetchReservas: url', url);
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
      console.log('[DEBUG FRONT] fetchReservas: response status', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('[DEBUG FRONT] fetchReservas: response data', data);
        setReservas(Array.from(data));
      } else {
        setError('Error al cargar las reservas');
        let errorData = null;
        try {
          errorData = await response.json();
        } catch (err) {
          errorData = '[No JSON response]';
        }
        console.log('[DEBUG FRONT] fetchReservas: error data', errorData);
      }
    } catch (err) {
      setError('Error de conexión');
      console.log('[DEBUG FRONT] fetchReservas: error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarReserva = async (reservaId: number) => {
    if (!confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      console.log('[DEBUG FRONT] Cancelación abortada por usuario');
      return;
    }

    try {
      const url = `http://localhost:8080/api/reservas/${reservaId}/cancelar`;
      console.log('[DEBUG FRONT] handleCancelarReserva: url', url);
      const response = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
      });
      console.log('[DEBUG FRONT] handleCancelarReserva: response status', response.status);

      if (response.ok) {
        // Actualizar la lista de reservas
        fetchReservas();
      } else {
        alert('Error al cancelar la reserva');
      }
    } catch (err) {
      alert('Error de conexión');
    }
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Debes estar logueado para ver tus reservas</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchReservas}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Mis Reservas</h2>
        <Button onClick={fetchReservas} variant="secondary">
          Actualizar
        </Button>
      </div>

      {reservas.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No tienes reservas activas</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reservas.map((reserva) => (
            <div
              key={reserva.pasajero_id}
              className={`bg-white rounded-lg shadow-md p-6 border ${
                reserva.estado 
                  ? 'border-green-200 hover:shadow-lg' 
                  : 'border-red-200 opacity-75'
              } transition-shadow`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Viaje #{reserva.viaje.num_viaje}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  reserva.estado 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {reserva.estado ? 'Activa' : 'Cancelada'}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-gray-600">
                  <span className="font-medium">Fecha:</span> {formatFecha(reserva.viaje.fecha)}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Pasajeros:</span> {reserva.cantidad_pasajeros}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Bus:</span> #{reserva.viaje.bus.bus_id}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Lugares disponibles:</span> {reserva.viaje.lugar_disponible}
                </p>
              </div>

              {reserva.estado && (
                <div className="space-y-2">
                  <Button
                    onClick={() => handleCancelarReserva(reserva.pasajero_id)}
                    variant="secondary"
                    className="w-full"
                  >
                    Cancelar Reserva
                  </Button>
                </div>
              )}

              {!reserva.estado && (
                <div className="text-center py-2">
                  <p className="text-sm text-gray-500">Reserva cancelada</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
