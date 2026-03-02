'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/api';
import Link from 'next/link';

const registerSchema = z.object({
  username: z.string().min(3, 'Usuario requerido (mín. 3 caracteres)'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  profile: z.object({
    primerNombre: z.string().min(1, 'Primer nombre requerido'),
    primerApellido: z.string().min(1, 'Primer apellido requerido'),
    fechaNacimiento: z.string().min(1, 'Fecha de nacimiento requerida'),
  }),
  taxpayer: z.object({
    NIT: z.string().min(1, 'NIT requerido'),
    CUI: z.string().min(1, 'CUI requerido'),
    domicilioFiscal: z.string().min(1, 'Domicilio fiscal requerido'),
  }),
});

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      profile: {
        primerNombre: '',
        primerApellido: '',
        fechaNacimiento: '',
      },
      taxpayer: {
        NIT: '',
        CUI: '',
        domicilioFiscal: '',
      },
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    try {
      // El backend espera CreateUserWithProfileTaxpayerDto que extiende de CreateUserDto
      // que incluye role: 'taxpayer' (o el correspondiente)
      const payload = {
        ...values,
        role: 'user', // Asumiendo que 'user' es el rol para contribuyentes
      };
      await api.post('/users/taxpayers', payload);
      toast.success('Registro exitoso. Ahora puedes iniciar sesión.');
      router.push('/auth/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background py-10 px-4">
      <Card className="w-full max-w-2xl border-primary/20 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-primary">Regístrate</CardTitle>
          <CardDescription>
            Crea tu cuenta de contribuyente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="usuario123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-primary/80">Información Personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="profile.primerNombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primer Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Juan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="profile.primerApellido"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primer Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="Pérez" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="profile.fechaNacimiento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Nacimiento</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-primary/80">Información Tributaria</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="taxpayer.NIT"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NIT</FormLabel>
                        <FormControl>
                          <Input placeholder="1234567-8" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="taxpayer.CUI"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CUI</FormLabel>
                        <FormControl>
                          <Input placeholder="1234 56789 0101" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="taxpayer.domicilioFiscal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domicilio Fiscal</FormLabel>
                      <FormControl>
                        <Input placeholder="Ciudad de Guatemala" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
                {isLoading ? 'Registrando...' : 'Finalizar Registro'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/auth/login" className="text-primary hover:underline font-semibold">
              Inicia sesión aquí
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
