import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: string;
  dni?: number;
  telefono?: number;
  estado?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si el usuario está autenticado al cargar la aplicación
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('--- [DEBUG] Iniciando checkAuthStatus ---');
      const response = await fetch('http://localhost:8080/api/auth/check', {
        credentials: 'include',
      });
      console.log('[DEBUG] /api/auth/check status:', response.status);
      const data = response.ok ? await response.json() : null;
      console.log('[DEBUG] /api/auth/check data:', data);
      if (data && data.authenticated && data.user) {
        try {
          console.log('[DEBUG] Intentando fetch /api/users/current');
          const userDataResponse = await fetch('http://localhost:8080/api/users/current', {
            credentials: 'include',
          });
          console.log('[DEBUG] /api/users/current status:', userDataResponse.status);
          const userDataText = await userDataResponse.text();
          console.log('[DEBUG] /api/users/current body:', userDataText);
          if (userDataResponse.ok) {
            const userData = JSON.parse(userDataText);
            console.log('[DEBUG] userData:', userData);
            setUser({
              id: userData.usu_id,
              email: userData.email,
              nombre: userData.nombre,
              apellido: userData.apellido,
              rol: userData.rol.nombre,
              dni: userData.dni,
              telefono: userData.telefono,
              estado: userData.estado
            });
          } else {
            console.warn('[DEBUG] /api/users/current fallo, usando datos básicos del check');
            setUser({
              id: data.user.usu_id || 0,
              email: data.user.email,
              nombre: data.user.nombre,
              apellido: data.user.apellido,
              rol: data.user.rol
            });
          }
        } catch (error) {
          console.error('[DEBUG] Error fetching complete user data:', error);
          setUser({
            id: data.user.usu_id || 0,
            email: data.user.email,
            nombre: data.user.nombre,
            apellido: data.user.apellido,
            rol: data.user.rol
          });
        }
      } else {
        console.warn('[DEBUG] Usuario no autenticado en /api/auth/check');
        setUser(null);
      }
    } catch (error) {
      console.error('[DEBUG] Error checking auth status:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
      console.log('--- [DEBUG] Fin checkAuthStatus ---');
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('--- [DEBUG] Iniciando login ---');
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      console.log('[DEBUG] /api/auth/login status:', response.status);
      const data = response.ok ? await response.json() : null;
      console.log('[DEBUG] /api/auth/login data:', data);
      if (data && data.success && data.user) {
        try {
          console.log('[DEBUG] Intentando fetch /api/users/current tras login');
          const userDataResponse = await fetch('http://localhost:8080/api/users/current', {
            credentials: 'include',
          });
          console.log('[DEBUG] /api/users/current status:', userDataResponse.status);
          const userDataText = await userDataResponse.text();
          console.log('[DEBUG] /api/users/current body:', userDataText);
          if (userDataResponse.ok) {
            const userData = JSON.parse(userDataText);
            console.log('[DEBUG] userData:', userData);
            setUser({
              id: userData.usu_id,
              email: userData.email,
              nombre: userData.nombre,
              apellido: userData.apellido,
              rol: userData.rol.nombre,
              dni: userData.dni,
              telefono: userData.telefono,
              estado: userData.estado
            });
          } else {
            console.warn('[DEBUG] /api/users/current fallo tras login, usando datos básicos');
            setUser({
              id: data.user.usu_id || 0,
              email: data.user.email,
              nombre: data.user.nombre,
              apellido: data.user.apellido,
              rol: data.user.rol
            });
          }
          return true;
        } catch (error) {
          console.error('[DEBUG] Error fetching complete user data tras login:', error);
          setUser({
            id: data.user.usu_id || 0,
            email: data.user.email,
            nombre: data.user.nombre,
            apellido: data.user.apellido,
            rol: data.user.rol
          });
          return true;
        }
      } else {
        console.warn('[DEBUG] Login fallido o usuario no presente');
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('[DEBUG] Error en login:', error);
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
      console.log('--- [DEBUG] Fin login ---');
    }
  };

  const logout = async () => {
    try {
      console.log('--- [DEBUG] Iniciando logout ---');
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      console.log('[DEBUG] Logout exitoso');
    } catch (error) {
      console.error('[DEBUG] Error en logout:', error);
    } finally {
      setIsLoading(false);
      console.log('--- [DEBUG] Fin logout ---');
    }
  };

  const value = { user, login, logout, isLoading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
