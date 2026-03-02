'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { 
  Plus, 
  Search, 
  FileText, 
  CreditCard, 
  Stamp, 
  MoreVertical,
  Ban
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { VehicleDetailsDialog } from '@/components/vehicles/vehicle-details-dialog';
import { useAuth } from '@/hooks/use-auth';
import { Vehicle, Role } from '@/types';
import api from '@/lib/api';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initialTab, setInitialTab] = useState('info');
  const { user } = useAuth();

  const isAdmin = user?.role === Role.Admin;

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/vehicles');
      setVehicles(response.data);
    } catch (error: any) {
      toast.error('Error al cargar vehículos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const openDetails = (vehicle: Vehicle, tab: string = 'info') => {
    setSelectedVehicle(vehicle);
    setInitialTab(tab);
    setIsDialogOpen(true);
  };

  const handleInactivate = async (placa: string) => {
    if (!confirm('¿Estás seguro de inactivar este vehículo?')) return;
    try {
      await api.patch(`/vehicles/${placa}/inactivar`);
      toast.success('Vehículo inactivado');
      fetchVehicles();
    } catch (error: any) {
      toast.error('Error al inactivar vehículo');
    }
  };

  const filteredVehicles = vehicles.filter(v => 
    v.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.catalog?.marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.catalog?.linea?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Vehículos</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Gestiona todos los vehículos del sistema' : 'Consulta tus vehículos registrados'}
          </p>
        </div>
        {isAdmin && (
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Vehículo
          </Button>
        )}
      </div>

      <Card className="border-primary/10">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por placa, marca o línea..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No se encontraron vehículos.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-bold">Placa</TableHead>
                    <TableHead className="font-bold">Marca / Línea</TableHead>
                    <TableHead className="font-bold">Modelo</TableHead>
                    <TableHead className="font-bold">Color</TableHead>
                    {isAdmin && <TableHead className="font-bold">Propietario (NIT)</TableHead>}
                    <TableHead className="font-bold">Estado</TableHead>
                    <TableHead className="text-right font-bold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.placa}>
                      <TableCell className="font-medium text-primary">{vehicle.placa}</TableCell>
                      <TableCell>
                        {vehicle.catalog?.marca} {vehicle.catalog?.linea}
                      </TableCell>
                      <TableCell>{vehicle.modelo}</TableCell>
                      <TableCell>{vehicle.color}</TableCell>
                      {isAdmin && (
                        <TableCell>
                          <div className="text-sm">
                            <p className="font-medium">
                              {vehicle.taxpayer?.profile?.primerNombre} {vehicle.taxpayer?.profile?.primerApellido}
                            </p>
                            <p className="text-xs text-muted-foreground">NIT: {vehicle.taxpayer?.NIT}</p>
                          </div>
                        </TableCell>
                      )}
                      <TableCell>
                        <Badge 
                          variant={vehicle.estado === 'ACTIVO' ? 'default' : 'destructive'} 
                          className={vehicle.estado === 'ACTIVO' ? 'bg-sky-500 hover:bg-sky-600' : ''}
                        >
                          {vehicle.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" onClick={() => openDetails(vehicle, 'info')}>
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Ver Detalles</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => openDetails(vehicle, 'tarjeta')}>
                              <CreditCard className="mr-2 h-4 w-4" />
                              <span>Tarjeta de Circulación</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => openDetails(vehicle, 'titulo')}>
                              <Stamp className="mr-2 h-4 w-4" />
                              <span>Título de Propiedad</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => openDetails(vehicle, 'calcomania')}
                            >
                              <CreditCard className="mr-2 h-4 w-4 text-sky-500" />
                              <span>Generar Calcomanía</span>
                            </DropdownMenuItem>
                            {isAdmin && vehicle.estado === 'ACTIVO' && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-destructive focus:text-destructive cursor-pointer"
                                  onClick={() => handleInactivate(vehicle.placa)}
                                >
                                  <Ban className="mr-2 h-4 w-4" />
                                  <span>Inactivar</span>
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <VehicleDetailsDialog 
        vehicle={selectedVehicle}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialTab={initialTab}
      />
    </div>
  );
}
