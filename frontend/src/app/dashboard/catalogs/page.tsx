'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { 
  Plus, 
  Search, 
  BookOpen, 
  MoreVertical,
  Trash2,
  Edit,
  Tag
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Catalog, Role } from '@/types';
import api from '@/lib/api';

export default function CatalogsPage() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const isAdmin = user?.role === Role.Admin;

  const fetchCatalogs = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/catalogs');
      setCatalogs(response.data);
    } catch (error: any) {
      toast.error('Error al cargar catálogos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchCatalogs();
    }
  }, [isAdmin]);

  const handleDelete = async (codigoISCV: string) => {
    if (!confirm('¿Estás seguro de eliminar este código ISCV?')) return;
    try {
      await api.delete(`/catalogs/${codigoISCV}`);
      toast.success('Catálogo eliminado');
      fetchCatalogs();
    } catch (error: any) {
      toast.error('Error al eliminar catálogo');
    }
  };

  const filteredCatalogs = catalogs.filter(c => 
    c.codigoISCV.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lineaEstilo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-destructive">Acceso Denegado</h2>
        <p>Solo los administradores pueden ver esta sección.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Catálogos ISCV</h1>
          <p className="text-muted-foreground">
            Mantenimiento de códigos de clasificación de vehículos
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Código
        </Button>
      </div>

      <Card className="border-primary/10">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por código, marca o línea..."
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
          ) : filteredCatalogs.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No se encontraron códigos en el catálogo.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-bold">Código ISCV</TableHead>
                    <TableHead className="font-bold">Marca</TableHead>
                    <TableHead className="font-bold">Línea / Estilo</TableHead>
                    <TableHead className="font-bold">Tipo</TableHead>
                    <TableHead className="font-bold">Valor Base</TableHead>
                    <TableHead className="text-right font-bold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCatalogs.map((c) => (
                    <TableRow key={c.codigoISCV}>
                      <TableCell className="font-medium text-primary flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        {c.codigoISCV}
                      </TableCell>
                      <TableCell>{c.marca}</TableCell>
                      <TableCell>{c.lineaEstilo}</TableCell>
                      <TableCell>{c.tipoVehiculo}</TableCell>
                      <TableCell className="font-semibold">
                        Q {Number(c.valorBase).toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive cursor-pointer"
                              onClick={() => handleDelete(c.codigoISCV)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Eliminar</span>
                            </DropdownMenuItem>
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
    </div>
  );
}
