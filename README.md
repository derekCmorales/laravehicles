# LaraVehicles

Sistema de Gestion Vehicular - Aplicacion completa con backend NestJS y frontend Next.js.

## Estructura del Proyecto

```
laravehicles/
├── src/                    # Backend (NestJS)
│   ├── auth/              # Autenticacion y autorizacion
│   ├── catalogs/          # Catalogo ISCV (marcas/modelos)
│   ├── database/          # Configuracion TypeORM
│   ├── pdf/               # Generacion de PDFs
│   ├── users/             # Usuarios, perfiles, contribuyentes
│   └── vehicles/          # Vehiculos, certificados, calcomanias
├── frontend/              # Frontend (Next.js)
│   ├── app/               # App Router pages
│   ├── components/        # Componentes UI
│   └── lib/               # Utilidades, API client, tipos
└── vercel.json            # Configuracion de deploy
```

## Requisitos Previos

- Node.js >= 20.0.0
- PostgreSQL >= 14
- npm o yarn

---

## 1. Configuracion de la Base de Datos

### Crear la base de datos en PostgreSQL:

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE laravehicles;

# Salir
\q
```

### Opcion alternativa con Docker:

```bash
docker run --name laravehicles-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=laravehicles \
  -p 5432:5432 \
  -d postgres:16
```

---

## 2. Instalacion del Backend (NestJS)

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/derekCmorales/laravehicles.git
cd laravehicles
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env-example .env
```

Editar el archivo `.env` con tus credenciales:

```env
PORT=3005
JWT_SECRET=tu-clave-secreta-segura-cambiar-en-produccion
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=laravehicles
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

### Paso 4: Ejecutar migraciones (si existen)

```bash
npm run migrations:run
```

> Nota: Si es la primera vez y no hay migraciones, el backend creara las tablas automaticamente con `synchronize: true` (solo en desarrollo).

### Paso 5: Iniciar el backend

```bash
# Modo desarrollo (con hot-reload)
npm run start:dev

# Modo produccion
npm run build
npm run start:prod
```

El backend estara disponible en: `http://localhost:3005`

### Documentacion API (Swagger)

Una vez iniciado, accede a la documentacion en:
- `http://localhost:3005/docs` - Swagger UI

---

## 3. Instalacion del Frontend (Next.js)

### Paso 1: Navegar a la carpeta frontend

```bash
cd frontend
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar variables de entorno

```bash
# Crear archivo de configuracion
cp .env.example .env.local
```

Si no existe `.env.example`, crear `.env.local` manualmente:

```env
NEXT_PUBLIC_API_URL=http://localhost:3005
```

### Paso 4: Iniciar el frontend

```bash
# Modo desarrollo
npm run dev

# Modo produccion
npm run build
npm run start
```

El frontend estara disponible en: `http://localhost:3000`

---

## 4. Ejecucion Completa (Ambos Modulos)

### Terminal 1 - Backend:

```bash
cd laravehicles
npm run start:dev
```

### Terminal 2 - Frontend:

```bash
cd laravehicles/frontend
npm run dev
```

---

## 5. Usuarios y Roles

El sistema tiene 2 roles:

| Rol | Permisos |
|-----|----------|
| **ADMIN** | Gestionar todos los vehiculos, contribuyentes, catalogo ISCV, inactivar vehiculos |
| **USER** | Ver sus propios vehiculos, solicitar calcomanias, descargar PDFs |

### Crear usuario administrador

Puedes crear un usuario admin directamente en la base de datos o mediante la API:

```bash
# Via API (registro)
curl -X POST http://localhost:3005/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "role": "ADMIN"
  }'
```

---

## 6. Comandos Utiles

### Backend

| Comando | Descripcion |
|---------|-------------|
| `npm run start:dev` | Iniciar en modo desarrollo |
| `npm run start:prod` | Iniciar en modo produccion |
| `npm run build` | Compilar para produccion |
| `npm run lint` | Ejecutar linter |
| `npm run test` | Ejecutar tests |
| `npm run migrations:run` | Ejecutar migraciones |
| `npm run migrations:generate` | Generar nueva migracion |

### Frontend

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Iniciar en modo desarrollo |
| `npm run build` | Compilar para produccion |
| `npm run start` | Iniciar servidor de produccion |
| `npm run lint` | Ejecutar linter |

---

## 7. Deploy en Produccion

### Frontend en Vercel

1. Conecta tu repositorio en [vercel.com](https://vercel.com)
2. El `vercel.json` ya configura el root directory como `frontend`
3. Agrega la variable de entorno `NEXT_PUBLIC_API_URL` con la URL del backend

### Backend en Railway/Render

1. Conecta tu repositorio
2. Configura las variables de entorno:
   - `PORT`
   - `JWT_SECRET`
   - `POSTGRES_HOST`
   - `POSTGRES_PORT`
   - `POSTGRES_DB`
   - `POSTGRES_USER`
   - `POSTGRES_PASSWORD`
3. Comando de build: `npm run build`
4. Comando de start: `npm run start:prod`

---

## 8. Funcionalidades Principales

- **Autenticacion JWT** - Login seguro con tokens
- **Gestion de Vehiculos** - CRUD completo con estados (Activo, Inactivo, Robado, Destruido)
- **Certificados de Propiedad** - Generacion y descarga en PDF
- **Tarjetas de Circulacion** - Generacion y descarga en PDF
- **Calcomanias** - Solicitud, pago y descarga en PDF
- **Catalogo ISCV** - Administracion de marcas, modelos y valores
- **Contribuyentes** - Gestion de perfiles y NIT/CUI

---

## 9. Troubleshooting

### Error: ECONNREFUSED PostgreSQL
```bash
# Verificar que PostgreSQL este corriendo
sudo systemctl status postgresql
# o con Docker
docker ps
```

### Error: Puerto en uso
```bash
# Cambiar el puerto en .env
PORT=3006
```

### Error: Migraciones fallidas
```bash
# Verificar conexion a la base de datos
psql -h localhost -U postgres -d laravehicles
```

### Frontend no conecta con backend
```bash
# Verificar que NEXT_PUBLIC_API_URL sea correcto en .env.local
# El backend debe tener CORS habilitado (ya esta configurado)
```

---

## Licencia

MIT
