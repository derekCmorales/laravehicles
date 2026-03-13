"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, ArrowLeft, User, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toaster";
import { api } from "@/lib/api";
import { Role } from "@/lib/types";

export default function RegistroPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    fechaNacimiento: "",
    NIT: "",
    CUI: "",
    nombreEmpresa: "",
    domicilioFiscal: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contrasenas no coinciden",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await api.createTaxpayer({
        username: formData.username,
        password: formData.password,
        role: Role.User,
        profile: {
          primerNombre: formData.primerNombre,
          segundoNombre: formData.segundoNombre || undefined,
          primerApellido: formData.primerApellido,
          segundoApellido: formData.segundoApellido || undefined,
          fechaNacimiento: formData.fechaNacimiento,
        },
        taxpayer: {
          NIT: formData.NIT,
          CUI: formData.CUI,
          nombreEmpresa: formData.nombreEmpresa || undefined,
          domicilioFiscal: formData.domicilioFiscal,
        },
      });

      toast({
        title: "Registro exitoso",
        description: "Su cuenta ha sido creada. Ya puede iniciar sesion.",
        variant: "success",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Error de registro",
        description: error instanceof Error ? error.message : "Error al crear la cuenta",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const isStep1Valid = formData.username && formData.password && formData.confirmPassword;
  const isStep2Valid = formData.primerNombre && formData.primerApellido && formData.fechaNacimiento;
  const isStep3Valid = formData.NIT && formData.CUI && formData.domicilioFiscal;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-muted/30 to-muted/50 p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Car className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Registro de Contribuyente</CardTitle>
          <CardDescription>Complete el formulario para crear su cuenta</CardDescription>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`mx-2 h-1 w-8 rounded transition-colors ${
                      step > s ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <User className="h-4 w-4" />
                  <span>Datos de Cuenta</span>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Usuario</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Ingrese su usuario"
                    value={formData.username}
                    onChange={(e) => updateField("username", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contrasena</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimo 8 caracteres"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    minLength={8}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contrasena</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repita su contrasena"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <User className="h-4 w-4" />
                  <span>Datos Personales</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primerNombre">Primer Nombre *</Label>
                    <Input
                      id="primerNombre"
                      type="text"
                      value={formData.primerNombre}
                      onChange={(e) => updateField("primerNombre", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="segundoNombre">Segundo Nombre</Label>
                    <Input
                      id="segundoNombre"
                      type="text"
                      value={formData.segundoNombre}
                      onChange={(e) => updateField("segundoNombre", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primerApellido">Primer Apellido *</Label>
                    <Input
                      id="primerApellido"
                      type="text"
                      value={formData.primerApellido}
                      onChange={(e) => updateField("primerApellido", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="segundoApellido">Segundo Apellido</Label>
                    <Input
                      id="segundoApellido"
                      type="text"
                      value={formData.segundoApellido}
                      onChange={(e) => updateField("segundoApellido", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaNacimiento">Fecha de Nacimiento *</Label>
                  <Input
                    id="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => updateField("fechaNacimiento", e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <CreditCard className="h-4 w-4" />
                  <span>Datos Fiscales</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="NIT">NIT *</Label>
                    <Input
                      id="NIT"
                      type="text"
                      placeholder="12345678-9"
                      value={formData.NIT}
                      onChange={(e) => updateField("NIT", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="CUI">CUI/DPI *</Label>
                    <Input
                      id="CUI"
                      type="text"
                      placeholder="1234567890123"
                      value={formData.CUI}
                      onChange={(e) => updateField("CUI", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombreEmpresa">Nombre de Empresa (opcional)</Label>
                  <Input
                    id="nombreEmpresa"
                    type="text"
                    placeholder="Si aplica"
                    value={formData.nombreEmpresa}
                    onChange={(e) => updateField("nombreEmpresa", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domicilioFiscal">Domicilio Fiscal *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="domicilioFiscal"
                      type="text"
                      placeholder="Direccion completa"
                      value={formData.domicilioFiscal}
                      onChange={(e) => updateField("domicilioFiscal", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex-1"
                  disabled={
                    (step === 1 && !isStep1Valid) ||
                    (step === 2 && !isStep2Valid)
                  }
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading || !isStep3Valid}
                >
                  {isLoading ? "Registrando..." : "Crear Cuenta"}
                </Button>
              )}
            </div>
          </form>

          <div className="mt-6 text-center">
            <Button variant="link" onClick={() => router.push("/")}>
              Ya tengo una cuenta, iniciar sesion
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
