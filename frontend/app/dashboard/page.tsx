"use client";

import { Car, FileText, Sticker, Users, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import useSWR from "swr";
import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { EstadoVehiculo } from "@/lib/types";

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: typeof Car;
  trend?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="mt-2 flex items-center text-xs text-success">
            <TrendingUp className="mr-1 h-3 w-3" />
            {trend}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function VehicleStatusBadge({ estado }: { estado: EstadoVehiculo }) {
  const variants: Record<EstadoVehiculo, "success" | "destructive" | "warning" | "secondary"> = {
    [EstadoVehiculo.ACTIVO]: "success",
    [EstadoVehiculo.INACTIVO_ADMINISTRATIVO]: "warning",
    [EstadoVehiculo.ROBADO]: "destructive",
    [EstadoVehiculo.DESTRUIDO]: "secondary",
  };

  const labels: Record<EstadoVehiculo, string> = {
    [EstadoVehiculo.ACTIVO]: "Activo",
    [EstadoVehiculo.INACTIVO_ADMINISTRATIVO]: "Inactivo",
    [EstadoVehiculo.ROBADO]: "Robado",
    [EstadoVehiculo.DESTRUIDO]: "Destruido",
  };

  return <Badge variant={variants[estado]}>{labels[estado]}</Badge>;
}

function RecentVehiclesTable({ vehicles }: { vehicles: Vehicle[] }) {
  if (!vehicles.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Car className="mb-4 h-12 w-12 text-muted-foreground/50" />
        <p className="text-muted-foreground">No hay vehiculos registrados</p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/dashboard/vehiculos">Ver todos los vehiculos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {vehicles.slice(0, 5).map((vehicle) => (
        <div
          key={vehicle.placa}
          className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Car className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{vehicle.placa}</p>
              <p className="text-sm text-muted-foreground">
                {vehicle.catalog?.marca} {vehicle.catalog?.lineaEstilo} - {vehicle.modelo}
              </p>
            </div>
          </div>
          <VehicleStatusBadge estado={vehicle.estado} />
        </div>
      ))}
      {vehicles.length > 5 && (
        <Button asChild variant="outline" className="w-full">
          <Link href="/dashboard/vehiculos">Ver todos ({vehicles.length})</Link>
        </Button>
      )}
    </div>
  );
}

function AdminDashboard() {
  const { data: vehicles = [] } = useSWR<Vehicle[]>("vehicles", () => api.getAllVehicles());
  const { data: taxpayers = [] } = useSWR("taxpayers", () => api.getAllProfilesTaxpayers());

  const activeVehicles = vehicles.filter((v) => v.estado === EstadoVehiculo.ACTIVO);
  const pendingDecals = vehicles.filter(
    (v) => v.vehicleDecals?.some((d) => d.estado === "PENDIENTE")
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Resumen del sistema de gestion vehicular</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Vehiculos"
          value={vehicles.length}
          description="Vehiculos registrados"
          icon={Car}
        />
        <StatCard
          title="Vehiculos Activos"
          value={activeVehicles.length}
          description="En circulacion"
          icon={TrendingUp}
        />
        <StatCard
          title="Contribuyentes"
          value={taxpayers.length}
          description="Usuarios registrados"
          icon={Users}
        />
        <StatCard
          title="Calcomanias Pendientes"
          value={pendingDecals.length}
          description="Por pagar"
          icon={Sticker}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vehiculos Recientes</CardTitle>
            <CardDescription>Ultimos vehiculos registrados en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentVehiclesTable vehicles={vehicles} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rapidas</CardTitle>
            <CardDescription>Operaciones frecuentes del sistema</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button asChild className="justify-start">
              <Link href="/dashboard/vehiculos/nuevo">
                <Car className="mr-2 h-4 w-4" />
                Registrar Nuevo Vehiculo
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/dashboard/contribuyentes">
                <Users className="mr-2 h-4 w-4" />
                Gestionar Contribuyentes
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/dashboard/catalogo">
                <FileText className="mr-2 h-4 w-4" />
                Administrar Catalogo ISCV
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function UserDashboard() {
  const { data: vehicles = [], isLoading } = useSWR<Vehicle[]>("my-vehicles", () =>
    api.getAllVehicles()
  );

  const activeVehicles = vehicles.filter((v) => v.estado === EstadoVehiculo.ACTIVO);
  const pendingDecals = vehicles.filter(
    (v) => v.vehicleDecals?.some((d) => d.estado === "PENDIENTE")
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mi Portal</h2>
        <p className="text-muted-foreground">Bienvenido a su portal de contribuyente</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Mis Vehiculos"
          value={vehicles.length}
          description="Vehiculos a mi nombre"
          icon={Car}
        />
        <StatCard
          title="Activos"
          value={activeVehicles.length}
          description="En circulacion"
          icon={TrendingUp}
        />
        <StatCard
          title="Calcomanias Pendientes"
          value={pendingDecals.length}
          description="Por renovar"
          icon={AlertCircle}
        />
      </div>

      {pendingDecals.length > 0 && (
        <Card className="border-warning bg-warning/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <CardTitle className="text-warning">Atenciones Pendientes</CardTitle>
            </div>
            <CardDescription>
              Tienes {pendingDecals.length} calcomania(s) pendiente(s) de pago
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/calcomanias">Ver Calcomanias Pendientes</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Mis Vehiculos</CardTitle>
          <CardDescription>Vehiculos registrados a su nombre</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <RecentVehiclesTable vehicles={vehicles} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function DashboardPage() {
  const { isAdmin } = useAuth();

  return isAdmin ? <AdminDashboard /> : <UserDashboard />;
}
