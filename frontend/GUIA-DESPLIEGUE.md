# Guia de Despliegue - Frontend SAT Vehiculos

Esta guia te ayudara a desplegar el frontend de la aplicacion paso a paso.

---

## Opcion 1: Desplegar en Vercel (Recomendado para principiantes)

Vercel es la plataforma mas facil para desplegar aplicaciones Next.js.

### Paso 1: Crear cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Sign Up"
3. Puedes registrarte con tu cuenta de GitHub (recomendado), GitLab, o correo electronico

### Paso 2: Conectar tu repositorio

1. Una vez dentro de Vercel, haz clic en "Add New..." > "Project"
2. Selecciona "Import Git Repository"
3. Si usas GitHub, autoriza Vercel para acceder a tus repositorios
4. Busca y selecciona tu repositorio `laravehicles`

### Paso 3: Configurar el proyecto

En la pantalla de configuracion:

1. **Framework Preset**: Vercel detectara automaticamente Next.js
2. **Root Directory**: Escribe `frontend` (importante, ya que el frontend esta en una subcarpeta)
3. **Build Command**: Deja el valor por defecto (`npm run build`)
4. **Output Directory**: Deja el valor por defecto

### Paso 4: Configurar Variables de Entorno

Haz clic en "Environment Variables" y agrega:

| Nombre | Valor | Descripcion |
|--------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://tu-backend.com` | URL donde esta corriendo tu backend NestJS |

**Ejemplo**: Si tu backend esta en `https://api-sat-vehiculos.railway.app`, escribe esa URL completa.

### Paso 5: Desplegar

1. Haz clic en "Deploy"
2. Espera 2-3 minutos mientras Vercel construye tu aplicacion
3. Una vez terminado, recibiras una URL como `tu-proyecto.vercel.app`

### Paso 6: Verificar

1. Abre la URL que te proporciono Vercel
2. Deberias ver la pagina de login
3. Intenta iniciar sesion para verificar que la conexion con el backend funciona

---

## Opcion 2: Desplegar el Backend en Railway

Si aun no tienes el backend desplegado, aqui te explico como hacerlo:

### Paso 1: Crear cuenta en Railway

1. Ve a [railway.app](https://railway.app)
2. Registrate con GitHub

### Paso 2: Crear nuevo proyecto

1. Haz clic en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Selecciona tu repositorio `laravehicles`

### Paso 3: Configurar el proyecto

Railway detectara que es un proyecto NestJS. Configura:

1. **Root Directory**: Deja vacio (el backend esta en la raiz)
2. **Start Command**: `npm run start:prod`

### Paso 4: Agregar base de datos PostgreSQL

1. En tu proyecto Railway, haz clic en "New" > "Database" > "PostgreSQL"
2. Railway creara automaticamente la base de datos
3. La variable `DATABASE_URL` se conectara automaticamente

### Paso 5: Configurar Variables de Entorno

En Railway, ve a "Variables" y agrega:

```
JWT_SECRET=tu-secreto-muy-seguro-aqui-123
PORT=3000
```

### Paso 6: Desplegar

1. Railway desplegara automaticamente
2. Una vez terminado, ve a "Settings" > "Domains"
3. Haz clic en "Generate Domain" para obtener una URL publica
4. Copia esta URL y usala como `NEXT_PUBLIC_API_URL` en Vercel

---

## Opcion 3: Ejecutar Localmente (Para desarrollo)

### Requisitos previos

- Node.js 18 o superior instalado
- npm o pnpm instalado

### Paso 1: Instalar dependencias

```bash
cd frontend
npm install
```

### Paso 2: Configurar variables de entorno

Crea un archivo `.env.local` en la carpeta `frontend`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Paso 3: Ejecutar

```bash
npm run dev
```

El frontend estara disponible en `http://localhost:3001`

---

## Solucion de Problemas Comunes

### Error: "Failed to fetch" o "Network Error"

**Causa**: El frontend no puede conectarse al backend.

**Solucion**:
1. Verifica que `NEXT_PUBLIC_API_URL` este correctamente configurado
2. Asegurate que el backend este corriendo y accesible
3. Verifica que el backend tenga CORS habilitado para tu dominio del frontend

### Error: "CORS policy" 

**Causa**: El backend no permite peticiones desde tu dominio.

**Solucion**: En tu backend NestJS, en `main.ts`, asegurate de tener:

```typescript
app.enableCors({
  origin: ['https://tu-frontend.vercel.app', 'http://localhost:3001'],
  credentials: true,
});
```

### La pagina carga pero no muestra datos

**Causa**: Problemas de autenticacion o API.

**Solucion**:
1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestana "Network"
3. Intenta hacer login y observa las peticiones
4. Verifica que las respuestas del servidor sean correctas

### Error 500 en el backend

**Causa**: Error en la configuracion del servidor.

**Solucion**:
1. Revisa los logs en Railway/Heroku
2. Verifica que la base de datos este conectada
3. Asegurate que las migraciones se ejecutaron

---

## Estructura de URLs de la API

El frontend se conecta a estos endpoints:

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | `/auth/login` | Iniciar sesion |
| GET | `/vehicles` | Obtener vehiculos |
| GET | `/vehicles/:placa/property-certificate/pdf` | Descargar certificado PDF |
| GET | `/vehicles/:placa/vehicle-registration/pdf` | Descargar tarjeta PDF |
| GET | `/vehicles/:placa/calcomania/pdf` | Descargar calcomania PDF |
| POST | `/vehicles/:placa/calcomania` | Generar calcomania |
| POST | `/vehicles/:placa/calcomania/pagar` | Pagar calcomania |

---

## Contacto y Soporte

Si tienes problemas:
1. Revisa los logs de Vercel/Railway
2. Verifica las variables de entorno
3. Asegurate que el backend este funcionando correctamente
