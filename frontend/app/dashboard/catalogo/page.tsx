"use client";

import { useState } from "react";
import { BookOpen, Search, Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/toaster";
import useSWR, { mutate } from "swr";
import type { Catalog } from "@/lib/types";

function CatalogFormDialog({
  catalog,
  open,
  onOpenChange,
}: {
  catalog: Catalog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Catalog>>(
    catalog || {
      codigoISCV: "",
      marca: "",
      lineaEstilo: "",
      tipoVehiculo: "",
      valorBase: 0,
    }
  );

  const isEditing = !!catalog;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing) {
        await api.updateCatalog(catalog.codigoISCV, formData);
        toast({
          title: "Catalogo actualizado",
          description: "El registro del catalogo ha sido actualizado",
          variant: "success",
        });
      } else {
        await api.createCatalog(formData);
        toast({
          title: "Catalogo creado",
          description: "El nuevo registro ha sido agregado al catalogo",
          variant: "success",
        });
      }
      mutate("catalogs");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al guardar",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Registro ISCV" : "Nuevo Registro ISCV"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los datos del catalogo"
              : "Agrega un nuevo registro al catalogo ISCV"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="codigoISCV">Codigo ISCV</Label>
            <Input
              id="codigoISCV"
              value={formData.codigoISCV}
              onChange={(e) => setFormData({ ...formData, codigoISCV: e.target.value })}
              disabled={isEditing}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="marca">Marca</Label>
            <Input
              id="marca"
              value={formData.marca}
              onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lineaEstilo">Linea / Estilo</Label>
            <Input
              id="lineaEstilo"
              value={formData.lineaEstilo}
              onChange={(e) => setFormData({ ...formData, lineaEstilo: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipoVehiculo">Tipo de Vehiculo</Label>
            <Input
              id="tipoVehiculo"
              value={formData.tipoVehiculo}
              onChange={(e) => setFormData({ ...formData, tipoVehiculo: e.target.value })}
              placeholder="Automovil, Motocicleta, Camion..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valorBase">Valor Base (Q)</Label>
            <Input
              id="valorBase"
              type="number"
              step="0.01"
              min="0"
              value={formData.valorBase}
              onChange={(e) =>
                setFormData({ ...formData, valorBase: parseFloat(e.target.value) })
              }
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteConfirmDialog({
  catalog,
  open,
  onOpenChange,
}: {
  catalog: Catalog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!catalog) return;
    setIsDeleting(true);

    try {
      await api.deleteCatalog(catalog.codigoISCV);
      toast({
        title: "Registro eliminado",
        description: "El registro del catalogo ha sido eliminado",
        variant: "success",
      });
      mutate("catalogs");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al eliminar",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Eliminacion</DialogTitle>
          <DialogDescription>
            Esta seguro que desea eliminar el registro{" "}
            <span className="font-semibold">{catalog?.codigoISCV}</span>? Esta accion no se
            puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function CatalogoPage() {
  const [search, setSearch] = useState("");
  const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: catalogs = [], isLoading } = useSWR<Catalog[]>("catalogs", () =>
    api.getAllCatalogs()
  );

  const filteredCatalogs = catalogs.filter(
    (c) =>
      c.codigoISCV.toLowerCase().includes(search.toLowerCase()) ||
      c.marca.toLowerCase().includes(search.toLowerCase()) ||
      c.lineaEstilo.toLowerCase().includes(search.toLowerCase())
  );

  const handleNew = () => {
    setSelectedCatalog(null);
    setFormOpen(true);
  };

  const handleEdit = (catalog: Catalog) => {
    setSelectedCatalog(catalog);
    setFormOpen(true);
  };

  const handleDelete = (catalog: Catalog) => {
    setSelectedCatalog(catalog);
    setDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Catalogo ISCV</h2>
          <p className="text-muted-foreground">
            Gestiona el catalogo de marcas y valores de vehiculos
          </p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Registro
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Registros del Catalogo</CardTitle>
              <CardDescription>{filteredCatalogs.length} registros encontrados</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por codigo, marca..."
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
          ) : filteredCatalogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">No se encontraron registros</p>
              <Button variant="outline" className="mt-4" onClick={handleNew}>
                Agregar primer registro
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Codigo ISCV</th>
                    <th className="pb-3 font-medium">Marca</th>
                    <th className="pb-3 font-medium">Linea / Estilo</th>
                    <th className="pb-3 font-medium">Tipo</th>
                    <th className="pb-3 font-medium">Valor Base</th>
                    <th className="pb-3 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCatalogs.map((catalog) => (
                    <tr
                      key={catalog.codigoISCV}
                      className="border-b last:border-0 hover:bg-muted/50"
                    >
                      <td className="py-4 font-mono text-sm">{catalog.codigoISCV}</td>
                      <td className="py-4 font-medium">{catalog.marca}</td>
                      <td className="py-4">{catalog.lineaEstilo}</td>
                      <td className="py-4">{catalog.tipoVehiculo}</td>
                      <td className="py-4 font-medium">
                        Q. {Number(catalog.valorBase).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(catalog)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(catalog)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <CatalogFormDialog
        catalog={selectedCatalog}
        open={formOpen}
        onOpenChange={setFormOpen}
      />

      <DeleteConfirmDialog
        catalog={selectedCatalog}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  );
}
