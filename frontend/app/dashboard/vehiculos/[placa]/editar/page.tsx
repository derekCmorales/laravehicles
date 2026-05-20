"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Car, ArrowLeft, FileText, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toaster";
import { api } from "@/lib/api";
import useSWR from "swr";
import type { Catalog, Taxpayer, Vehicle, PropertyCertificate, VehicleRegistration } from "@/lib/types";
import Link from "next/link";

export default function EditarVehiculoPage() {
  const router = useRouter();
  const params = useParams();
  const placa = params.placa as string;
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { data: vehicle, error: vehicleError } = useSWR<Vehicle>(
    placa ? `vehicle-${placa}` : null,
    () => api.getVehicleByPlaca(placa)
  );

  const { data: certificate } = useSWR<PropertyCertificate>(
    vehicle ? `certificate-${placa}` : null,
    () => api.getPropertyCertificate(placa)
  );

  const { data: registration } = useSWR<VehicleRegistration>(
    vehicle ? `registration-${placa}` : null,
    () => api.getVehicleRegistration(placa)
  );
  
  const { data: catalogs = [] } = useSWR<Catalog[]>("catalogs", () => api.getAllCatalogs());
  const { data: taxpayers = [] } = useSWR<Taxpayer[]>("taxpayers", () =>
    api.getAllProfilesTaxpayers()
  );

  const [formData, setFormData] = useState({
    // Vehiculo
    placa: "",
    codigoUnicoIdentificador: "",
    uso: "",
    estado: "",
    modelo: new Date().getFullYear(),
    vin: "",
    serie: "",
    chasis: "",
    motor: "",
    centimetrosCubicos: 0,
    asientos: 5,
    cilindros: 4,
    combustible: "",
    puertas: 4,
    tonelaje: 0,
    color: "",
    ejes: 2,
    nit: "",
    codigoISCV: "",
    // Certificado
    noCertificado: "",
    certificadoCodigoUnico: "",
    fechaEmision: "",
    aduanaLiquidadora: "",
    polizaImportacion: "",
    fechaPoliza: "",
    franquiciaNo: 0,
  });

  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const formatCombustible = (str: string) => {
    if (!str) return "";
    const lower = str.toLowerCase();
    if (lower === "glp") return "GLP";
    return capitalize(str);
  };

  useEffect(() => {
    if (vehicle) {
      setFormData((prev) => ({
        ...prev,
        placa: vehicle.placa || "",
        codigoUnicoIdentificador: vehicle.codigoUnicoIdentificador || "",
        uso: capitalize(vehicle.uso || ""),
        estado: vehicle.estado || "",
        modelo: vehicle.modelo || new Date().getFullYear(),
        vin: vehicle.vin || "",
        serie: vehicle.serie || "",
        chasis: vehicle.chasis || "",
        motor: vehicle.motor || "",
        centimetrosCubicos: vehicle.centimetrosCubicos || 0,
        asientos: vehicle.asientos || 5,
        cilindros: vehicle.cilindros || 4,
        combustible: formatCombustible(vehicle.combustible || ""),
        puertas: vehicle.puertas || 4,
        tonelaje: vehicle.tonelaje || 0,
        color: vehicle.color || "",
        ejes: vehicle.ejes || 2,
        nit: vehicle.taxpayer?.NIT || "",
        codigoISCV: vehicle.catalog?.codigoISCV || "",
      }));
    }
  }, [vehicle]);

  useEffect(() => {
    if (certificate) {
      setFormData((prev) => ({
        ...prev,
        noCertificado: certificate.noCertificado || "",
        certificadoCodigoUnico: certificate.codigoUnicoIdentificador || "",
        fechaEmision: certificate.fechaEmision ? new Date(certificate.fechaEmision).toISOString().split('T')[0] : "",
        aduanaLiquidadora: certificate.aduanaLiquidadora || "",
        polizaImportacion: certificate.polizaImportacion || "",
        fechaPoliza: certificate.fechaPoliza ? new Date(certificate.fechaPoliza).toISOString().split('T')[0] : "",
        franquiciaNo: certificate.franquiciaNo || 0,
      }));
    }
  }, [certificate]);

  const updateField = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.updateVehicle(placa, {
        codigoUnicoIdentificador: formData.codigoUnicoIdentificador,
        uso: formData.uso,
        estado: formData.estado as any,
        modelo: formData.modelo,
        vin: formData.vin,
        serie: formData.serie,
        chasis: formData.chasis,
        motor: formData.motor,
        centimetrosCubicos: formData.centimetrosCubicos,
        asientos: formData.asientos,
        cilindros: formData.cilindros,
        combustible: formData.combustible,
        puertas: formData.puertas,
        tonelaje: formData.tonelaje,
        color: formData.color,
        ejes: formData.ejes,
        nit: formData.nit,
        codigoISCV: formData.codigoISCV,
        propertyCertificate: {
          noCertificado: formData.noCertificado,
          codigoUnicoIdentificador: formData.certificadoCodigoUnico,
          fechaEmision: formData.fechaEmision || new Date().toISOString(),
          aduanaLiquidadora: formData.aduanaLiquidadora,
          polizaImportacion: formData.polizaImportacion,
          fechaPoliza: formData.fechaPoliza || new Date().toISOString(),
          franquiciaNo: formData.franquiciaNo,
        },
      });

      toast({
        title: "Vehículo actualizado",
        description: "Los cambios han sido guardados, se ha generado una nueva tarjeta de circulación y se ha registrado en el historial.",
        variant: "success",
      });
      router.push("/dashboard/vehiculos");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al actualizar vehiculo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!vehicle && !vehicleError) return <div className="p-8 text-center">Cargando...</div>;
  if (vehicleError) return <div className="p-8 text-center text-destructive">Error cargando vehiculo</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/vehiculos">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Editar Vehículo {placa}</h2>
          <p className="text-muted-foreground">Modificar atributos y cambiar propietario</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Datos del Vehículo</CardTitle>
            <CardDescription>Actualice la informacion general del vehiculo. Cualquier cambio quedara registrado.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="placa">Placa</Label>
                <Input
                  id="placa"
                  value={formData.placa}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigoUnicoIdentificador">Codigo Identificador *</Label>
                <Input
                  id="codigoUnicoIdentificador"
                  value={formData.codigoUnicoIdentificador}
                  onChange={(e) => updateField("codigoUnicoIdentificador", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vin">VIN *</Label>
                <Input
                  id="vin"
                  value={formData.vin}
                  onChange={(e) => updateField("vin", e.target.value.toUpperCase())}
                  maxLength={17}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Propietario (Traspaso)</Label>
                <Select
                  value={formData.nit}
                  onValueChange={(value) => updateField("nit", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el propietario" />
                  </SelectTrigger>
                  <SelectContent>
                    {taxpayers.map((t) => (
                      <SelectItem key={t.NIT} value={t.NIT}>
                        {t.NIT} - {t.profile ? `${t.profile.primerNombre} ${t.profile.primerApellido}` : "Desconocido"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Catálogo ISCV (Marca/Línea)</Label>
                <Select
                  value={formData.codigoISCV}
                  onValueChange={(value) => updateField("codigoISCV", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione la linea" />
                  </SelectTrigger>
                  <SelectContent>
                    {catalogs.map((catalog) => (
                      <SelectItem key={catalog.codigoISCV} value={catalog.codigoISCV}>
                        {catalog.marca} - {catalog.lineaEstilo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="uso">Uso *</Label>
                <Select
                  value={formData.uso}
                  onValueChange={(value) => updateField("uso", value)}
                >
                  <SelectTrigger id="uso">
                    <SelectValue placeholder="Seleccione el uso">
                      {formData.uso || "Seleccione el uso"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Particular">Particular</SelectItem>
                    <SelectItem value="Comercial">Comercial</SelectItem>
                    <SelectItem value="Oficial">Oficial</SelectItem>
                    <SelectItem value="Transporte">Transporte</SelectItem>
                    <SelectItem value="Alquiler">Alquiler</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado">Estado *</Label>
                <Select
                  value={formData.estado}
                  onValueChange={(value) => updateField("estado", value)}
                >
                  <SelectTrigger id="estado">
                    <SelectValue placeholder="Seleccione el estado">
                      {formData.estado || "Seleccione el estado"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVO">Activo</SelectItem>
                    <SelectItem value="INACTIVO_ADMINISTRATIVO">Inactivo</SelectItem>
                    <SelectItem value="ROBADO">Robado</SelectItem>
                    <SelectItem value="DESTRUIDO">Destruido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="modelo">Ano/Modelo *</Label>
                <Input
                  id="modelo"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.modelo}
                  onChange={(e) => updateField("modelo", parseInt(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color *</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => updateField("color", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="combustible">Combustible *</Label>
                <Select
                  value={formData.combustible}
                  onValueChange={(v) => updateField("combustible", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione combustible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gasolina">Gasolina</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Hibrido">Hibrido</SelectItem>
                    <SelectItem value="Electrico">Electrico</SelectItem>
                    <SelectItem value="GLP">GLP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serie">Serie *</Label>
                <Input
                  id="serie"
                  value={formData.serie}
                  onChange={(e) => updateField("serie", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chasis">Chasis *</Label>
                <Input
                  id="chasis"
                  value={formData.chasis}
                  onChange={(e) => updateField("chasis", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motor">Motor *</Label>
                <Input
                  id="motor"
                  value={formData.motor}
                  onChange={(e) => updateField("motor", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="centimetrosCubicos">Cilindrada (CC) *</Label>
                <Input
                  id="centimetrosCubicos"
                  type="number"
                  min="0"
                  value={formData.centimetrosCubicos}
                  onChange={(e) => updateField("centimetrosCubicos", parseInt(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cilindros">Cilindros *</Label>
                <Input
                  id="cilindros"
                  type="number"
                  min="1"
                  max="16"
                  value={formData.cilindros}
                  onChange={(e) => updateField("cilindros", parseInt(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="asientos">Asientos *</Label>
                <Input
                  id="asientos"
                  type="number"
                  min="1"
                  value={formData.asientos}
                  onChange={(e) => updateField("asientos", parseInt(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="puertas">Puertas *</Label>
                <Input
                  id="puertas"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.puertas}
                  onChange={(e) => updateField("puertas", parseInt(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ejes">Ejes *</Label>
                <Input
                  id="ejes"
                  type="number"
                  min="2"
                  max="10"
                  value={formData.ejes}
                  onChange={(e) => updateField("ejes", parseInt(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tonelaje">Tonelaje *</Label>
                <Input
                  id="tonelaje"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.tonelaje}
                  onChange={(e) => updateField("tonelaje", parseFloat(e.target.value))}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Certificado de Propiedad</CardTitle>
            <CardDescription>Datos del certificado de propiedad asociado al vehiculo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="noCertificado">No. Certificado *</Label>
                <Input
                  id="noCertificado"
                  value={formData.noCertificado}
                  onChange={(e) => updateField("noCertificado", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificadoCodigoUnico">Codigo Identificador (Certificado) *</Label>
                <Input
                  id="certificadoCodigoUnico"
                  value={formData.certificadoCodigoUnico}
                  onChange={(e) => updateField("certificadoCodigoUnico", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaEmision">Fecha de Emision *</Label>
                <Input
                  id="fechaEmision"
                  type="date"
                  value={formData.fechaEmision}
                  onChange={(e) => updateField("fechaEmision", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aduanaLiquidadora">Aduana Liquidadora *</Label>
                <Input
                  id="aduanaLiquidadora"
                  placeholder="Nombre de la aduana"
                  value={formData.aduanaLiquidadora}
                  onChange={(e) => updateField("aduanaLiquidadora", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="polizaImportacion">Poliza de Importacion *</Label>
                <Input
                  id="polizaImportacion"
                  value={formData.polizaImportacion}
                  onChange={(e) => updateField("polizaImportacion", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaPoliza">Fecha Poliza *</Label>
                <Input
                  id="fechaPoliza"
                  type="date"
                  value={formData.fechaPoliza}
                  onChange={(e) => updateField("fechaPoliza", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="franquiciaNo">Franquicia No. *</Label>
                <Input
                  id="franquiciaNo"
                  type="number"
                  min="0"
                  value={formData.franquiciaNo}
                  onChange={(e) => updateField("franquiciaNo", parseInt(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 mt-4 border-t">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}