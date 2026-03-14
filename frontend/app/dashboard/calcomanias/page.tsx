"use client";

import { useState } from "react";
import { Sticker, Car, CreditCard, CheckCircle, Clock, AlertCircle, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/toaster";
import useSWR, { mutate } from "swr";
import type { Vehicle, VehicleDecal } from "@/lib/types";

function DecalStatusBadge({ estado }: { estado: string }) {
  const variants: Record<string, "success" | "warning" | "secondary"> = {
    PAGADO: "success",
    PENDIENTE: "warning",
    VENCIDO: "secondary",
  };

  const icons: Record<string, typeof CheckCircle> = {
    PAGADO: CheckCircle,
    PENDIENTE: Clock,
    VENCIDO: AlertCircle,
  };

  const Icon = icons[estado] || Clock;

  return (
    <Badge variant={variants[estado] || "secondary"} className="gap-1">
      <Icon className="h-3 w-3" />
      {estado}
    </Badge>
  );
}

function PaymentDialog({
  vehicle,
  decal,
  open,
  onOpenChange,
}: {
  vehicle: Vehicle;
  decal: VehicleDecal;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      await api.pagarCalcomania(vehicle.placa);
      toast({
        title: "Pago exitoso",
        description: "La calcomania ha sido pagada y activada",
        variant: "success",
      });
      mutate("vehicles");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error en el pago",
        description: error instanceof Error ? error.message : "No se pudo procesar el pago",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Pagar Calcomania
          </DialogTitle>
          <DialogDescription>
            Procesar el pago de la calcomania para el vehiculo {vehicle.placa}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{vehicle.placa}</p>
                <p className="text-sm text-muted-foreground">
                  {vehicle.catalog?.marca} {vehicle.catalog?.lineaEstilo}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Ano</p>
                <p className="font-medium">{decal.anio}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Calcomania {decal.anio}</span>
              <span className="font-semibold">Q. 150.00</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t pt-2">
              <span className="font-medium">Total a pagar</span>
              <span className="text-lg font-bold text-primary">Q. 150.00</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? "Procesando..." : "Confirmar Pago"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DecalCard({
  vehicle,
  decal,
  onPay,
  onDownload,
  isDownloading,
}: {
  vehicle: Vehicle;
  decal: VehicleDecal;
  onPay: () => void;
  onDownload: () => void;
  isDownloading: boolean;
}) {
  return (
    <div className="rounded-lg border bg-card p-4 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Sticker className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold">{vehicle.placa}</p>
            <p className="text-sm text-muted-foreground">
              {vehicle.catalog?.marca} {vehicle.catalog?.lineaEstilo}
            </p>
          </div>
        </div>
        <DecalStatusBadge estado={decal.estado} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Ano</p>
          <p className="font-medium">{decal.anio}</p>
        </div>
        <div>
          <p className="text-muted-foreground">ID Calcomania</p>
          <p className="font-mono text-xs">{decal.idCalcomania}</p>
        </div>
        {decal.fechaImpresion && (
          <div className="col-span-2">
            <p className="text-muted-foreground">Fecha Impresion</p>
            <p className="font-medium">
              {new Date(decal.fechaImpresion).toLocaleDateString("es-GT")}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        {decal.estado === "PENDIENTE" ? (
          <Button className="flex-1" onClick={onPay}>
            <CreditCard className="mr-2 h-4 w-4" />
            Pagar Calcomania
          </Button>
        ) : decal.estado === "PAGADO" && (
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={onDownload}
            disabled={isDownloading}
          >
            <Download className="mr-2 h-4 w-4" />
            {isDownloading ? "Descargando..." : "Descargar PDF"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default function CalcomaniasPage() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedDecal, setSelectedDecal] = useState<VehicleDecal | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [downloadingPlaca, setDownloadingPlaca] = useState<string | null>(null);

  const { data: vehicles = [], isLoading } = useSWR<Vehicle[]>("vehicles", () =>
    api.getAllVehicles()
  );

  const vehiclesWithDecals = vehicles.filter((v) => v.vehicleDecals && v.vehicleDecals.length > 0);
  const pendingDecals = vehicles.filter((v) =>
    v.vehicleDecals?.some((d) => d.estado === "PENDIENTE")
  );

  const handlePay = (vehicle: Vehicle, decal: VehicleDecal) => {
    setSelectedVehicle(vehicle);
    setSelectedDecal(decal);
    setPaymentOpen(true);
  };

  const handleDownload = async (placa: string) => {
    setDownloadingPlaca(placa);
    try {
      await api.downloadVehicleDecalPdf(placa);
      toast({
        title: "Descarga exitosa",
        description: "Calcomania descargada correctamente",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al descargar",
        variant: "destructive",
      });
    } finally {
      setDownloadingPlaca(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Calcomanias</h2>
        <p className="text-muted-foreground">
          {isAdmin
            ? "Gestiona las calcomanias de todos los vehiculos"
            : "Consulta y paga tus calcomanias pendientes"}
        </p>
      </div>

      {pendingDecals.length > 0 && (
        <Card className="border-warning bg-warning/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <CardTitle className="text-warning">Calcomanias Pendientes</CardTitle>
            </div>
            <CardDescription>
              Tienes {pendingDecals.length} vehiculo(s) con calcomanias pendientes de pago
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : vehiclesWithDecals.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Sticker className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">No hay calcomanias registradas</p>
                <p className="text-sm text-muted-foreground">
                  Las calcomanias se generan desde el detalle del vehiculo
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          vehiclesWithDecals.map((vehicle) =>
            vehicle.vehicleDecals?.map((decal) => (
              <DecalCard
                key={decal.idCalcomania}
                vehicle={vehicle}
                decal={decal}
                onPay={() => handlePay(vehicle, decal)}
                onDownload={() => handleDownload(vehicle.placa)}
                isDownloading={downloadingPlaca === vehicle.placa}
              />
            ))
          )
        )}
      </div>

      {selectedVehicle && selectedDecal && (
        <PaymentDialog
          vehicle={selectedVehicle}
          decal={selectedDecal}
          open={paymentOpen}
          onOpenChange={setPaymentOpen}
        />
      )}
    </div>
  );
}
