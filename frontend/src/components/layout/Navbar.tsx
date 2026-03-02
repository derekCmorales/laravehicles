'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Role } from '@/types';
import { 
  Car, 
  Users, 
  BookOpen, 
  LogOut, 
  Menu,
  User as UserIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const isAdmin = user.role === Role.Admin;

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/dashboard" className="text-2xl font-bold text-primary flex items-center gap-2">
            <Car className="h-8 w-8" />
            <span>LaraVehicles</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard/vehicles">
              <Button variant="ghost" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Vehículos
              </Button>
            </Link>
            
            {isAdmin && (
              <>
                <Link href="/dashboard/users">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Usuarios
                  </Button>
                </Link>
                <Link href="/dashboard/catalogs">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Catálogos
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-right mr-2">
            <p className="text-sm font-medium leading-none">{user.profile?.primerNombre} {user.profile?.primerApellido}</p>
            <p className="text-xs text-muted-foreground uppercase">{user.role}</p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full border-primary/20">
                <UserIcon className="h-5 w-5 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
