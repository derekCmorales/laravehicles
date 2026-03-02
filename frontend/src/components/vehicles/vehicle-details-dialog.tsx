'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  FileText, 
  CreditCard, 
  Stamp, 
  Printer,
  Calendar,
  User,
  Hash
} from 'lucide-react';
import api from '@/lib/api';
import { Vehicle, Role } from '@/types';
import { toast } from 'sonner';

interface VehicleDetailsDialogProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export function VehicleDetailsDialog({ vehicle, isOpen, onClose, initialTab = 'info' }: VehicleDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      if (initialTab !== 'info') {
        fetchData(initialTab);
      }
    } else {
      setData(null);
    }
  }, [isOpen, initialTab, vehicle]);

  const fetchData = async (tab: string) => {
    if (!vehicle) return;
    setIsLoading(true);
    setData(null);
    try {
      let endpoint = '';
      if (tab === 'tarjeta') endpoint = `/vehicles/${vehicle.placa}/vehicle-registration`;
      else if (tab === 'titulo') endpoint = `/vehicles/${vehicle.placa}/property-certificate`;
      else if (tab === 'calcomania') {
        try {
          const res = await api.post(`/vehicles/${vehicle.placa}/calcomania`);
          setData(res.data);
        } catch (err: any) {
          const msg = err.response?.data?.message || 'No se pudo generar la calcomanía';
          toast.error(msg);
        }
        setIsLoading(false);
        return;
      }

      if (endpoint) {
        const res = await api.get(endpoint);
        setData(res.data);
      }
    } catch (error: any) {
      toast.error('No se pudo cargar la información del documento');
    } finally {
      setIsLoading(false);
    }
  };

  if (!vehicle) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-primary/20">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-100 rounded-full">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-primary">Vehículo {vehicle.placa}</DialogTitle>
              <DialogDescription>
                {vehicle.catalog?.marca} {vehicle.catalog?.lineaEstilo} - Modelo {vehicle.modelo}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); fetchData(v); }} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-sky-50">
            <TabsTrigger value="info">General</TabsTrigger>
            <TabsTrigger value="tarjeta">Tarjeta</TabsTrigger>
            <TabsTrigger value="titulo">Título</TabsTrigger>
            <TabsTrigger value="calcomania">Calcomanía</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 p-3 border rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground uppercase font-semibold">VIN / Chasis</p>
                <p className="font-mono text-sm">{vehicle.vin}</p>
                <p className="font-mono text-xs text-muted-foreground">Chasis: {vehicle.chasis}</p>
              </div>
              <div className="space-y-1 p-3 border rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Motor</p>
                <p className="font-mono text-sm">{vehicle.motor}</p>
              </div>
              <div className="space-y-1 p-3 border rounded-lg">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Color</p>
                <p className="font-medium capitalize">{vehicle.color}</p>
              </div>
              <div className="space-y-1 p-3 border rounded-lg">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Tipo de Vehículo</p>
                <p className="font-medium">{vehicle.catalog?.tipoVehiculo}</p>
              </div>
            </div>

            <div className="p-4 border border-sky-100 bg-sky-50/50 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">Propietario Actual</p>
                <p className="text-lg font-bold">{vehicle.taxpayer?.profile?.primerNombre} {vehicle.taxpayer?.profile?.primerApellido}</p>
                <p className="text-sm text-muted-foreground">NIT: {vehicle.taxpayer?.NIT}</p>
              </div>
              <Badge className="bg-sky-500">{vehicle.estado}</Badge>
            </div>
          </TabsContent>

          <TabsContent value="tarjeta" className="py-4">
            {isLoading ? (
              <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
            ) : data ? (
              <div className="border-2 border-dashed border-sky-200 p-6 rounded-xl bg-white space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 bg-sky-500 text-white rounded-bl-lg text-[10px] font-bold">CIRCULACIÓN</div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-10 w-10 text-primary" />
                    <h3 className="text-xl font-black text-primary">TARJETA DE CIRCULACIÓN</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-muted-foreground uppercase">No. de Tarjeta</p>
                    <p className="text-lg font-mono font-bold text-sky-700">{data.noTarjeta}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Placa</p>
                    <p className="text-xl font-bold">{vehicle.placa}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Fecha de Registro</p>
                    <p className="text-sm font-medium">{new Date(data.fechaRegistro).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="p-3 bg-sky-50 rounded border border-sky-100">
                  <p className="text-[10px] font-bold text-sky-700 uppercase">Válida Hasta</p>
                  <p className="text-lg font-bold text-sky-900">{new Date(data.validaHasta).toLocaleDateString()}</p>
                </div>
                <Button className="w-full" variant="outline"><Printer className="mr-2 h-4 w-4" /> Imprimir Documento</Button>
              </div>
            ) : <p className="text-center py-10 text-muted-foreground">No se encontró información de la tarjeta.</p>}
          </TabsContent>

          <TabsContent value="titulo" className="py-4">
             {isLoading ? (
              <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
            ) : data ? (
              <div className="border-2 border-primary/20 p-8 bg-amber-50/30 rounded-lg space-y-6 shadow-sm">
                <div className="text-center space-y-1">
                  <Stamp className="h-12 w-12 text-primary mx-auto opacity-20" />
                  <h3 className="text-2xl font-serif font-bold text-primary">TÍTULO DE PROPIEDAD DE VEHÍCULO</h3>
                </div>
                <div className="grid grid-cols-2 gap-8 py-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">No. Certificado</p>
                      <p className="font-bold border-b border-primary/20">{data.noCertificado}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">NIT Propietario</p>
                      <p className="font-bold border-b border-primary/20">{vehicle.taxpayer?.NIT}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">CUI / Pasaporte</p>
                      <p className="font-bold border-b border-primary/20">{vehicle.taxpayer?.CUI}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">Aduana Liquidadora</p>
                      <p className="font-bold border-b border-primary/20">{data.aduanaLiquidadora}</p>
                    </div>
                  </div>
                </div>
                <div className="text-center pt-4 opacity-50 italic text-[10px]">
                  Este documento certifica legalmente la propiedad del vehículo ante las autoridades correspondientes.
                </div>
              </div>
            ) : <p className="text-center py-10 text-muted-foreground">No se encontró información del título.</p>}
          </TabsContent>

          <TabsContent value="calcomania" className="py-4">
            {isLoading ? (
              <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
            ) : data ? (
              <div className="flex flex-col items-center gap-6">
                <div className="w-full max-w-sm bg-sky-400 text-white rounded-lg shadow-xl overflow-hidden border-4 border-white">
                  <div className="p-4 flex justify-between items-center border-b border-white/20">
                    <h4 className="text-2xl font-black italic tracking-tighter underline">GUATEMALA 2025</h4>
                    <div className="bg-white text-sky-600 px-2 py-1 rounded text-xs font-bold">IMPUESTO PAGADO</div>
                  </div>
                  <div className="p-6 text-center space-y-4">
                    <div className="text-5xl font-black tracking-widest">{data.placa}</div>
                    <div className="flex justify-around text-xs font-bold border-t border-b border-white/20 py-2">
                      <span>MODELO: {data.modelo}</span>
                      <span>COLOR: {data.color}</span>
                    </div>
                    <div className="text-[10px] uppercase font-bold opacity-90">
                      PROPIETARIO: {data.propietario}
                    </div>
                  </div>
                  <div className="bg-sky-600 p-2 text-center text-[8px] font-bold">
                    VALIDADO ELECTRÓNICAMENTE - FECHA PAGO: {new Date(data.fechaPago).toLocaleString()}
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-bold text-primary">Monto del Impuesto: Q {(data.montoIscv ?? 0).toFixed(2)}</p>
                  <Button className="w-full bg-sky-600 hover:bg-sky-700"><Printer className="mr-2 h-4 w-4" /> Descargar Calcomanía</Button>
                </div>
              </div>
            ) : <p className="text-center py-10 text-muted-foreground">No se pudo generar la calcomanía.</p>}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
