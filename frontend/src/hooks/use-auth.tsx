'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, AuthResponse } from '@/types';
import api from '@/lib/api';

interface AuthContextType {
  user: User | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('access_token');
      
      if (storedUser && token && storedUser !== 'undefined') {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error restore auth', error);
          localStorage.removeItem('user');
          localStorage.removeItem('access_token');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Redirección centralizada si es necesario
  useEffect(() => {
    console.log('Estado de auth:', { user, isLoading, pathname });
    
    if (!isLoading) {
      if (!user && pathname.startsWith('/dashboard')) {
        console.log('Redirigiendo a /auth/login (No hay usuario)');
        router.replace('/auth/login');
      } else if (user && (pathname.startsWith('/auth') || pathname === '/')) {
        console.log('Redirigiendo a /dashboard (Usuario autenticado)');
        router.replace('/dashboard');
      }
    }
  }, [user, isLoading, pathname, router]);

  const login = (data: AuthResponse) => {
    console.log('Llamando a login() con:', data);
    if (data.access_token && data.user) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } else {
      console.error('Datos de login inválidos:', data);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    router.replace('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
