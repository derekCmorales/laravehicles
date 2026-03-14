"use client";

import { useState } from "react";
import { Car, Search, Plus, Eye, FileText, Sticker, Download, FileCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/toaster";
import useSWR, { mutate } from "swr";
import Link from "next/link";
import type { Vehicle, PropertyCertificate, VehicleRegistration } from "@/lib/types";
import { EstadoVehiculo } from "@/lib/types";

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

function VehicleDetailDialog({
  vehicle,
  open,
  onOpenChange,
}: {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloadingCertificate, setIsDownloadingCertificate] = useState(false);
  const [isDownloadingRegistration, setIsDownloadingRegistration] = useState(false);
  const [isDownloadingDecal, setIsDownloadingDecal] = useState(false);
  const { data: certificate } = useSWR<PropertyCertificate>(
    vehicle && open ? `certificate-${vehicle.placa}` : null,
    () => api.getPropertyCertificate(vehicle!.placa)
  );
  const { data: registration } = useSWR<VehicleRegistration>(
    vehicle && open ? `registration-${vehicle.placa}` : null,
    () => api.getVehicleRegistration(vehicle!.placa)
  );

  const handleGenerateCalcomania = async () => {
    if (!vehicle) return;
    setIsGenerating(true);
    try {
      await api.generateCalcomania(vehicle.placa);
      mutate("vehicles");
      toast({
        title: "Calcomania generada",
        description: "La calcomania ha sido generada. Ve a la seccion de Calcomanias para pagarla.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al generar calcomania",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadCertificate = async () => {
    if (!vehicle) return;
    setIsDownloadingCertificate(true);
    try {
      await api.downloadPropertyCertificatePdf(vehicle.placa);
      toast({
        title: "Descarga exitosa",
        description: "Certificado de propiedad descargado",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al descargar certificado",
        variant: "destructive",
      });
    } finally {
      setIsDownloadingCertificate(false);
    }
  };

  const handleDownloadRegistration = async () => {
    if (!vehicle) return;
    setIsDownloadingRegistration(true);
    try {
      await api.downloadVehicleRegistrationPdf(vehicle.placa);
      toast({
        title: "Descarga exitosa",
        description: "Tarjeta de circulacion descargada",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al descargar tarjeta",
        variant: "destructive",
      });
    } finally {
      setIsDownloadingRegistration(false);
    }
  };

  const handleDownloadDecal = async () => {
    if (!vehicle) return;
    setIsDownloadingDecal(true);
    try {
      await api.downloadVehicleDecalPdf(vehicle.placa);
      toast({
        title: "Descarga exitosa",
        description: "Calcomania descargada",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al descargar calcomania",
        variant: "destructive",
      });
    } finally {
      setIsDownloadingDecal(false);
    }
  };

  if (!vehicle) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Car className="h-5 w-5 text-primary-foreground" />
            </div>
            Vehiculo {vehicle.placa}
          </DialogTitle>
          <DialogDescription>
            {vehicle.catalog?.marca} {vehicle.catalog?.lineaEstilo} - Modelo {vehicle.modelo}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="certificado">Certificado</TabsTrigger>
            <TabsTrigger value="tarjeta">Tarjeta</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Placa</p>
                <p className="font-medium">{vehicle.placa}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Estado</p>
                <VehicleStatusBadge estado={vehicle.estado} />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">VIN</p>
                <p className="font-mono text-sm">{vehicle.vin}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Modelo</p>
                <p className="font-medium">{vehicle.modelo}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Color</p>
                <p className="font-medium">{vehicle.color}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Combustible</p>
                <p className="font-medium">{vehicle.combustible}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Cilindros</p>
                <p className="font-medium">{vehicle.cilindros}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Cilindrada (CC)</p>
                <p className="font-medium">{vehicle.centimetrosCubicos} cc</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Asientos</p>
                <p className="font-medium">{vehicle.asientos}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Puertas</p>
                <p className="font-medium">{vehicle.puertas}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Tonelaje</p>
                <p className="font-medium">{vehicle.tonelaje} ton</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Ejes</p>
                <p className="font-medium">{vehicle.ejes}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t">
              <Button onClick={handleGenerateCalcomania} disabled={isGenerating}>
                <Sticker className="mr-2 h-4 w-4" />
                {isGenerating ? "Generando..." : "Generar Calcomania"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleDownloadDecal}
                disabled={isDownloadingDecal}
              >
                <Download className="mr-2 h-4 w-4" />
                {isDownloadingDecal ? "Descargando..." : "Descargar Calcomania PDF"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="certificado" className="space-y-4">
            {certificate ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">No. Certificado</p>
                    <p className="font-medium">{certificate.noCertificado}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fecha Emision</p>
                    <p className="font-medium">
                      {new Date(certificate.fechaEmision).toLocaleDateString("es-GT")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Aduana Liquidadora</p>
                    <p className="font-medium">{certificate.aduanaLiquidadora}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Poliza Importacion</p>
                    <p className="font-medium">{certificate.polizaImportacion}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fecha Poliza</p>
                    <p className="font-medium">
                      {new Date(certificate.fechaPoliza).toLocaleDateString("es-GT")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Franquicia No.</p>
                    <p className="font-medium">{certificate.franquiciaNo}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={handleDownloadCertificate}
                    disabled={isDownloadingCertificate}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {isDownloadingCertificate ? "Descargando..." : "Descargar PDF"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <FileText className="mr-2 h-5 w-5" />
                Cargando certificado...
              </div>
            )}
          </TabsContent>

          <TabsContent value="tarjeta" className="space-y-4">
            {registration ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">No. Tarjeta</p>
                    <p className="font-medium">{registration.noTarjeta}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fecha Registro</p>
                    <p className="font-medium">
                      {registration.fechaRegistro ? new Date(registration.fechaRegistro).toLocaleDateString("es-GT") : "-"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Aduana Liquidadora</p>
                    <p className="font-medium">{registration.aduanaLiquidadora || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Valida Hasta</p>
                    <p className="font-medium">
                      {registration.validaHasta ? new Date(registration.validaHasta).toLocaleDateString("es-GT") : "-"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={handleDownloadRegistration}
                    disabled={isDownloadingRegistration}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {isDownloadingRegistration ? "Descargando..." : "Descargar PDF"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <FileText className="mr-2 h-5 w-5" />
                Cargando tarjeta de circulacion...
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default function VehiculosPage() {
  const { isAdmin } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: vehicles = [], isLoading } = useSWR<Vehicle[]>("vehicles", () =>
    api.getAllVehicles()
  );

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.placa.toLowerCase().includes(search.toLowerCase()) ||
      v.catalog?.marca.toLowerCase().includes(search.toLowerCase()) ||
      v.vin.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {isAdmin ? "Gestion de Vehiculos" : "Mis Vehiculos"}
          </h2>
          <p className="text-muted-foreground">
            {isAdmin
              ? "Administra todos los vehiculos del sistema"
              : "Consulta tus vehiculos registrados"}
          </p>
        </div>
        {isAdmin && (
          <Button asChild>
            <Link href="/dashboard/vehiculos/nuevo">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Vehiculo
            </Link>
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Listado de Vehiculos</CardTitle>
              <CardDescription>{filteredVehicles.length} vehiculos encontrados</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por placa, marca..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Car className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">No se encontraron vehiculos</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Placa</th>
                    <th className="pb-3 font-medium">Marca / Linea</th>
                    <th className="pb-3 font-medium">Modelo</th>
                    <th className="pb-3 font-medium">Color</th>
                    <th className="pb-3 font-medium">Estado</th>
                    <th className="pb-3 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map((vehicle) => (
                    <tr
                      key={vehicle.placa}
                      className="border-b last:border-0 hover:bg-muted/50"
                    >
                      <td className="py-4 font-medium">{vehicle.placa}</td>
                      <td className="py-4">
                        {vehicle.catalog?.marca} {vehicle.catalog?.lineaEstilo}
                      </td>
                      <td className="py-4">{vehicle.modelo}</td>
                      <td className="py-4">{vehicle.color}</td>
                      <td className="py-4">
                        <VehicleStatusBadge estado={vehicle.estado} />
                      </td>
                      <td className="py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewVehicle(vehicle)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <VehicleDetailDialog
        vehicle={selectedVehicle}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
