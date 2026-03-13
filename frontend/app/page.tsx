"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, Shield, Users, FileText, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/lib/auth-context";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({ username, password });
      toast({
        title: "Inicio de sesion exitoso",
        description: "Bienvenido al sistema SAT Vehiculos",
        variant: "success",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error de autenticacion",
        description: error instanceof Error ? error.message : "Credenciales incorrectas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <Car className="h-8 w-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">SAT Vehiculos</CardTitle>
        <CardDescription>
          Ingrese sus credenciales para acceder al sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                placeholder="Ingrese su usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contrasena</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Ingrese su contrasena"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Ingresando..." : "Iniciar Sesion"}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <Button variant="link" onClick={() => router.push("/registro")}>
            Registrarse como contribuyente
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: typeof Car; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Features */}
      <div className="hidden w-1/2 bg-gradient-to-br from-primary to-primary/80 p-12 lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">SAT Vehiculos</span>
          </div>
          <h1 className="mt-12 text-4xl font-bold leading-tight text-white text-balance">
            Sistema de Gestion Vehicular
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Superintendencia de Administracion Tributaria - Modulo de control y registro de vehiculos
          </p>
        </div>

        <div className="space-y-4">
          <FeatureCard
            icon={FileText}
            title="Registro de Vehiculos"
            description="Gestiona toda la informacion de tu flota vehicular en un solo lugar"
          />
          <FeatureCard
            icon={Shield}
            title="Certificados y Calcomanias"
            description="Genera y administra certificados de propiedad y calcomanias de circulacion"
          />
          <FeatureCard
            icon={Users}
            title="Gestion de Contribuyentes"
            description="Administra perfiles de contribuyentes y sus vehiculos asociados"
          />
        </div>

        <p className="text-sm text-white/60">
          Sistema oficial de la Superintendencia de Administracion Tributaria
        </p>
      </div>

      {/* Right Side - Login */}
      <div className="flex w-full items-center justify-center bg-muted/30 p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="mb-8 text-center lg:hidden">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
              <Car className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">SAT Vehiculos</h1>
            <p className="text-muted-foreground">Sistema de Gestion Vehicular</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
}
