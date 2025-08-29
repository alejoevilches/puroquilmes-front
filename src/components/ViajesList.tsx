import React, { useState, useEffect } from 'react';
import Button from './Button';

interface Viaje {
  viaje_id: number;
  num_viaje: number;
  lugar_disponible: number;
  fecha: string;
  estado: boolean;
  bus: {
    bus_id: number;
    // Agregar más campos del bus si es necesario
  };
}

interface ViajesListProps {
  onReservar: (viaje: Viaje) => void;
}

export default function ViajesList({ onReservar }: ViajesListProps) {
  const [viajes, setViajes] = useState<Viaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchViajes();
  }, []);

  const fetchViajes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/viajes/disponibles', {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (response.ok) {
        const data = await response.json();
        setViajes(Array.from(data));
      } else {
        setError('Error al cargar los viajes');
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
        <Button onClick={fetchViajes}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Lista de viajes */}
      {viajes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No hay viajes disponibles</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {viajes.map((viaje) => (
            <div
              key={viaje.viaje_id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Viaje #{viaje.num_viaje}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  viaje.estado 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {viaje.estado ? 'Activo' : 'Inactivo'}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-gray-600">
                  <span className="font-medium">Fecha:</span> {formatFecha(viaje.fecha)}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Lugares disponibles:</span> {viaje.lugar_disponible}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Bus ID:</span> {viaje.bus.bus_id}
                </p>
              </div>

              {viaje.estado && viaje.lugar_disponible > 0 && (
                <Button
                  onClick={() => onReservar(viaje)}
                  className="w-full"
                >
                  Reservar
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
