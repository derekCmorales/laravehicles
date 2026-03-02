'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Role } from '@/types';
import { Car, Users, BookOpen, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    vehicles: 0,
    users: 0,
    catalogs: 0,
  });

  const isAdmin = user?.role === Role.Admin;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const vehiclesRes = await api.get('/vehicles');
        let usersRes = { data: [] };
        let catalogsRes = { data: [] };
        
        if (isAdmin) {
          usersRes = await api.get('/users');
          catalogsRes = await api.get('/catalogs');
        }

        setStats({
          vehicles: vehiclesRes.data.length,
          users: usersRes.data.length,
          catalogs: catalogsRes.data.length,
        });
      } catch (error) {
        console.error('Error fetching stats', error);
      }
    };

    fetchStats();
  }, [isAdmin]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Bienvenido, {user?.profile?.primerNombre}
        </h1>
        <p className="text-muted-foreground">
          Aquí tienes un resumen de tu actividad en LaraVehicles
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/10 bg-sky-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehículos</CardTitle>
            <Car className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.vehicles}</div>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? 'Total en el sistema' : 'Registrados a tu nombre'}
            </p>
          </CardContent>
        </Card>

        {isAdmin && (
          <>
            <Card className="border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.users}</div>
                <p className="text-xs text-muted-foreground">Contribuyentes y Admins</p>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Catálogos</CardTitle>
                <BookOpen className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.catalogs}</div>
                <p className="text-xs text-muted-foreground">Códigos ISCV</p>
              </CardContent>
            </Card>
          </>
        )}

        <Card className="border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trámites</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Activos</div>
            <p className="text-xs text-muted-foreground">Calcomanías y Tarjetas</p>
          </CardContent>
        </Card>
      </div>
      
      {!isAdmin && stats.vehicles === 0 && (
        <Card className="bg-sky-50 border-sky-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <Car className="h-12 w-12 text-sky-400 mx-auto" />
              <h3 className="text-lg font-semibold text-sky-900">¿No ves tus vehículos?</h3>
              <p className="text-sky-700">Comunícate con un administrador para vincular tus vehículos a tu NIT.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
