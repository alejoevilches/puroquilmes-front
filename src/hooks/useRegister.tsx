import { useState } from 'react';

export interface RegisterData {
  email: string;
  password: string; // 👈 ojo: en backend usás "clave", vamos a mapearlo
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    console.log("[REGISTER] Iniciando registro con data:", data);

    try {
      // 👉 Convertimos el objeto en x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append("nombre", data.nombre);
      formData.append("apellido", data.apellido);
      formData.append("email", data.email);
      formData.append("dni", data.dni);
      formData.append("telefono", data.telefono);
      formData.append("clave", data.password); // 👈 importante: backend espera "clave"

      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      console.log("[REGISTER] Response status:", response.status);
      console.log("[REGISTER] Response headers:", response.headers);

      if (response.ok) {
        console.log("[REGISTER] Registro exitoso");
        setSuccess(true);
      } else {
        const text = await response.text();
        console.log("[REGISTER] Response body (raw text):", text);
        let errorMsg;
        try {
          const json = JSON.parse(text);
          errorMsg = json.message || "Error al crear la cuenta";
        } catch {
          errorMsg = text || "Error al crear la cuenta";
        }
        setError(errorMsg);
      }
    } catch (err) {
      console.error("[REGISTER] Error en fetch:", err);
      setError("Error de conexión");
    } finally {
      console.log("[REGISTER] Finalizando, loading = false");
      setLoading(false);
    }
  };

  return { register, loading, error, success };
}
