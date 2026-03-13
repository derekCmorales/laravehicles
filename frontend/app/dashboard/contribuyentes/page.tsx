"use client";

import { useState } from "react";
import { Users, Search, Eye, Car, MapPin, CreditCard } from "lucide-react";
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
import { api } from "@/lib/api";
import useSWR from "swr";
import type { Taxpayer } from "@/lib/types";

function TaxpayerDetailDialog({
  taxpayer,
  open,
  onOpenChange,
}: {
  taxpayer: Taxpayer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!taxpayer) return null;

  const fullName = taxpayer.profile
    ? `${taxpayer.profile.primerNombre} ${taxpayer.profile.segundoNombre || ""} ${taxpayer.profile.primerApellido} ${taxpayer.profile.segundoApellido || ""}`.trim()
    : "N/A";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            Contribuyente
          </DialogTitle>
          <DialogDescription>{fullName}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="personal" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="fiscal">Fiscal</TabsTrigger>
            <TabsTrigger value="vehiculos">Vehiculos</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Primer Nombre</p>
                <p className="font-medium">{taxpayer.profile?.primerNombre || "-"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Segundo Nombre</p>
                <p className="font-medium">{taxpayer.profile?.segundoNombre || "-"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Primer Apellido</p>
                <p className="font-medium">{taxpayer.profile?.primerApellido || "-"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Segundo Apellido</p>
                <p className="font-medium">{taxpayer.profile?.segundoApellido || "-"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Fecha de Nacimiento</p>
                <p className="font-medium">
                  {taxpayer.profile?.fechaNacimiento
                    ? new Date(taxpayer.profile.fechaNacimiento).toLocaleDateString("es-GT")
                    : "-"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Fecha de Registro</p>
                <p className="font-medium">
                  {new Date(taxpayer.fechaCreacion).toLocaleDateString("es-GT")}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fiscal" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <CreditCard className="h-3 w-3" /> NIT
                </p>
                <p className="font-mono font-medium">{taxpayer.NIT}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">CUI/DPI</p>
                <p className="font-mono font-medium">{taxpayer.CUI}</p>
              </div>
              {taxpayer.nombreEmpresa && (
                <div className="col-span-2 space-y-1">
                  <p className="text-sm text-muted-foreground">Nombre de Empresa</p>
                  <p className="font-medium">{taxpayer.nombreEmpresa}</p>
                </div>
              )}
              <div className="col-span-2 space-y-1">
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" /> Domicilio Fiscal
                </p>
                <p className="font-medium">{taxpayer.domicilioFiscal}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vehiculos" className="space-y-4">
            {taxpayer.vehicles && taxpayer.vehicles.length > 0 ? (
              <div className="space-y-3">
                {taxpayer.vehicles.map((vehicle) => (
                  <div
                    key={vehicle.placa}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{vehicle.placa}</p>
                        <p className="text-sm text-muted-foreground">
                          {vehicle.catalog?.marca} - {vehicle.modelo}
                        </p>
                      </div>
                    </div>
                    <Badge variant={vehicle.estado === "ACTIVO" ? "success" : "secondary"}>
                      {vehicle.estado}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Car className="mb-2 h-10 w-10 text-muted-foreground/50" />
                <p className="text-muted-foreground">No tiene vehiculos registrados</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default function ContribuyentesPage() {
  const [search, setSearch] = useState("");
  const [selectedTaxpayer, setSelectedTaxpayer] = useState<Taxpayer | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: taxpayers = [], isLoading } = useSWR<Taxpayer[]>("taxpayers", () =>
    api.getAllProfilesTaxpayers()
  );

  const filteredTaxpayers = taxpayers.filter((t) => {
    const searchLower = search.toLowerCase();
    const fullName = t.profile
      ? `${t.profile.primerNombre} ${t.profile.primerApellido}`.toLowerCase()
      : "";
    return (
      t.NIT.toLowerCase().includes(searchLower) ||
      t.CUI.toLowerCase().includes(searchLower) ||
      fullName.includes(searchLower)
    );
  });

  const handleView = (taxpayer: Taxpayer) => {
    setSelectedTaxpayer(taxpayer);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Contribuyentes</h2>
        <p className="text-muted-foreground">
          Gestiona los contribuyentes registrados en el sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Listado de Contribuyentes</CardTitle>
              <CardDescription>{filteredTaxpayers.length} contribuyentes encontrados</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por NIT, CUI..."
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
          ) : filteredTaxpayers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">No se encontraron contribuyentes</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Nombre</th>
                    <th className="pb-3 font-medium">NIT</th>
                    <th className="pb-3 font-medium">CUI</th>
                    <th className="pb-3 font-medium">Vehiculos</th>
                    <th className="pb-3 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTaxpayers.map((taxpayer) => (
                    <tr
                      key={taxpayer.NIT}
                      className="border-b last:border-0 hover:bg-muted/50"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">
                            {taxpayer.profile
                              ? `${taxpayer.profile.primerNombre} ${taxpayer.profile.primerApellido}`
                              : "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 font-mono text-sm">{taxpayer.NIT}</td>
                      <td className="py-4 font-mono text-sm">{taxpayer.CUI}</td>
                      <td className="py-4">
                        <Badge variant="secondary">
                          {taxpayer.vehicles?.length || 0} vehiculos
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(taxpayer)}
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

      <TaxpayerDetailDialog
        taxpayer={selectedTaxpayer}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
