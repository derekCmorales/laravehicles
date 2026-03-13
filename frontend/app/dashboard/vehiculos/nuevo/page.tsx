"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import type { Catalog, Taxpayer } from "@/lib/types";
import Link from "next/link";

export default function NuevoVehiculoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const { data: catalogs = [] } = useSWR<Catalog[]>("catalogs", () => api.getAllCatalogs());
  const { data: taxpayers = [] } = useSWR<Taxpayer[]>("taxpayers", () =>
    api.getAllProfilesTaxpayers()
  );

  const [formData, setFormData] = useState({
    // Vehiculo
    placa: "",
    codigoUnicoIdentificador: "",
    uso: "",
    modelo: new Date().getFullYear(),
    vin: "",
    serie: "",
    chasis: "",
    motor: "",
    centimetrosCubicos: 0,
    asientos: 5,
    cilindros: 4,
    combustible: "Gasolina",
    puertas: 4,
    tonelaje: 0,
    color: "",
    ejes: 2,
    nit: "",
    codigoISCV: "",
    // Certificado de propiedad
    noCertificado: "",
    certificadoCodigoUnico: "",
    fechaEmision: "",
    aduanaLiquidadora: "",
    polizaImportacion: "",
    fechaPoliza: "",
    franquiciaNo: 0,
    // Tarjeta de circulacion
    noTarjeta: "",
    tarjetaFechaRegistro: "",
    tarjetaAduanaLiquidadora: "",
    tarjetaValidaHasta: "",
  });

  const updateField = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.createVehicle({
        placa: formData.placa,
        codigoUnicoIdentificador: formData.codigoUnicoIdentificador,
        uso: formData.uso,
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
          fechaEmision: formData.fechaEmision,
          aduanaLiquidadora: formData.aduanaLiquidadora,
          polizaImportacion: formData.polizaImportacion,
          fechaPoliza: formData.fechaPoliza,
          franquiciaNo: formData.franquiciaNo,
        },
        vehicleRegistration: {
          noTarjeta: formData.noTarjeta,
          fechaRegistro: formData.tarjetaFechaRegistro,
          aduanaLiquidadora: formData.tarjetaAduanaLiquidadora,
          validaHasta: formData.tarjetaValidaHasta,
        },
      });

      toast({
        title: "Vehiculo registrado",
        description: "El vehiculo ha sido registrado exitosamente",
        variant: "success",
      });
      router.push("/dashboard/vehiculos");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al registrar vehiculo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/vehiculos">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Nuevo Vehiculo</h2>
          <p className="text-muted-foreground">Registrar un nuevo vehiculo en el sistema</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2">
            {[
              { num: 1, label: "Vehiculo", icon: Car },
              { num: 2, label: "Certificado", icon: FileText },
              { num: 3, label: "Tarjeta", icon: CreditCard },
            ].map((s) => (
              <div key={s.num} className="flex items-center">
                <div
                  className={`flex flex-col items-center ${
                    step >= s.num ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                      step >= s.num
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="mt-1 text-xs font-medium">{s.label}</span>
                </div>
                {s.num < 3 && (
                  <div
                    className={`mx-4 h-1 w-12 rounded transition-colors ${
                      step > s.num ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <CardTitle className="text-lg">Datos del Vehiculo</CardTitle>
                <CardDescription>Informacion general del vehiculo</CardDescription>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="placa">Placa *</Label>
                    <Input
                      id="placa"
                      placeholder="P-123ABC"
                      value={formData.placa}
                      onChange={(e) => updateField("placa", e.target.value.toUpperCase())}
                      required
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
                      placeholder="17 caracteres"
                      value={formData.vin}
                      onChange={(e) => updateField("vin", e.target.value.toUpperCase())}
                      maxLength={17}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nit">Propietario (NIT) *</Label>
                    <Select value={formData.nit} onValueChange={(v) => updateField("nit", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar contribuyente" />
                      </SelectTrigger>
                      <SelectContent>
                        {taxpayers.map((t) => (
                          <SelectItem key={t.NIT} value={t.NIT}>
                            {t.NIT} - {t.profile?.primerNombre} {t.profile?.primerApellido}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="codigoISCV">Catalogo ISCV *</Label>
                    <Select
                      value={formData.codigoISCV}
                      onValueChange={(v) => updateField("codigoISCV", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar marca/modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        {catalogs.map((c) => (
                          <SelectItem key={c.codigoISCV} value={c.codigoISCV}>
                            {c.marca} {c.lineaEstilo} - Q.{c.valorBase}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="uso">Uso *</Label>
                    <Select value={formData.uso} onValueChange={(v) => updateField("uso", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar uso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Particular">Particular</SelectItem>
                        <SelectItem value="Comercial">Comercial</SelectItem>
                        <SelectItem value="Oficial">Oficial</SelectItem>
                        <SelectItem value="Transporte">Transporte</SelectItem>
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
                      placeholder="Ej: Blanco"
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
                        <SelectValue />
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
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <CardTitle className="text-lg">Certificado de Propiedad</CardTitle>
                <CardDescription>Datos del certificado de propiedad del vehiculo</CardDescription>

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
                    <Label htmlFor="certificadoCodigoUnico">Codigo Identificador *</Label>
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
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <CardTitle className="text-lg">Tarjeta de Circulacion</CardTitle>
                <CardDescription>Datos de la tarjeta de circulacion del vehiculo</CardDescription>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="noTarjeta">No. Tarjeta *</Label>
                    <Input
                      id="noTarjeta"
                      value={formData.noTarjeta}
                      onChange={(e) => updateField("noTarjeta", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tarjetaFechaRegistro">Fecha de Registro *</Label>
                    <Input
                      id="tarjetaFechaRegistro"
                      type="date"
                      value={formData.tarjetaFechaRegistro}
                      onChange={(e) => updateField("tarjetaFechaRegistro", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tarjetaAduanaLiquidadora">Aduana Liquidadora *</Label>
                    <Input
                      id="tarjetaAduanaLiquidadora"
                      value={formData.tarjetaAduanaLiquidadora}
                      onChange={(e) => updateField("tarjetaAduanaLiquidadora", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tarjetaValidaHasta">Valida Hasta *</Label>
                    <Input
                      id="tarjetaValidaHasta"
                      type="date"
                      value={formData.tarjetaValidaHasta}
                      onChange={(e) => updateField("tarjetaValidaHasta", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 border-t pt-6">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
              )}
              <div className="flex-1" />
              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Siguiente
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Registrando..." : "Registrar Vehiculo"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
