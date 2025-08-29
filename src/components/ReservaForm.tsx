import React, { useState, useContext } from 'react';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';

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

interface ReservaFormProps {
  viaje: Viaje;
  onReservaExitosa: () => void;
  onCancelar: () => void;
}

export default function ReservaForm({ viaje, onReservaExitosa, onCancelar }: ReservaFormProps) {
  const { user } = useAuth();
  const [cantidadPasajeros, setCantidadPasajeros] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[DEBUG FRONT] handleSubmit called');
    console.log('[DEBUG FRONT] user:', user);
    console.log('[DEBUG FRONT] viaje:', viaje);
    console.log('[DEBUG FRONT] cantidadPasajeros:', cantidadPasajeros);

    if (!user) {
      setError('Debes estar logueado para hacer una reserva');
      console.log('[DEBUG FRONT] Error: usuario no logueado');
      return;
    }

    if (cantidadPasajeros > viaje.lugar_disponible) {
      setError(`Solo hay ${viaje.lugar_disponible} lugares disponibles`);
      console.log('[DEBUG FRONT] Error: no hay suficientes lugares');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const fetchBody = {
        viajeId: viaje.viaje_id,
        userId: user.id,
        cantidadPasajeros: cantidadPasajeros,
      };
      console.log('[DEBUG FRONT] fetch body:', fetchBody);

      const response = await fetch('http://localhost:8080/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(fetchBody),
      });

      console.log('[DEBUG FRONT] fetch response status:', response.status);
      if (response.ok) {
        console.log('[DEBUG FRONT] Reserva exitosa');
        onReservaExitosa();
      } else {
        let errorData = null;
        try {
          errorData = await response.json();
        } catch (err) {
          errorData = '[No JSON response]';
        }
        console.log('[DEBUG FRONT] Error en reserva:', errorData);
        setError(errorData.message || 'Error al crear la reserva');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Reservar Viaje</h2>
          <button
            onClick={onCancelar}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Información del viaje */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Detalles del Viaje</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-medium">Número:</span> #{viaje.num_viaje}</p>
            <p><span className="font-medium">Fecha:</span> {formatFecha(viaje.fecha)}</p>
            <p><span className="font-medium">Lugares disponibles:</span> {viaje.lugar_disponible}</p>
            <p><span className="font-medium">Bus:</span> #{viaje.bus.bus_id}</p>
          </div>
        </div>

        {/* Formulario de reserva */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cantidadPasajeros" className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad de pasajeros
            </label>
            <select
              id="cantidadPasajeros"
              value={cantidadPasajeros}
              onChange={(e) => setCantidadPasajeros(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {Array.from({ length: Math.min(viaje.lugar_disponible, 10) }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'pasajero' : 'pasajeros'}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onCancelar}
              variant="secondary"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Procesando...' : 'Confirmar Reserva'}
            </Button>
          </div>
        </form>

        {/* Información adicional */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Importante:</strong> Una vez confirmada la reserva, recibirás un email de confirmación.
            Puedes cancelar tu reserva hasta 24 horas antes del viaje.
          </p>
        </div>
      </div>
    </div>
  );
}
