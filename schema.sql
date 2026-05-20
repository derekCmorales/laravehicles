-- ============================================================
-- Schema SQL - LaraVehicles
-- Base de datos: laravehicles
-- Motor: PostgreSQL >= 14
-- ============================================================

-- Enum para estados de vehiculo
CREATE TYPE "public"."vehiculo_estado_enum" AS ENUM(
  'ACTIVO',
  'INACTIVO_ADMINISTRATIVO',
  'ROBADO',
  'DESTRUIDO'
);

-- ============================================================
-- 1. usuario
-- ============================================================
CREATE TABLE "usuario" (
  "id_usuario" SERIAL NOT NULL,
  "username" character varying(100) NOT NULL,
  "password" character varying(255) NOT NULL,
  "rol" character varying(50) NOT NULL DEFAULT 'user',
  "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
  "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "UQ_usuario_username" UNIQUE ("username"),
  CONSTRAINT "PK_usuario" PRIMARY KEY ("id_usuario")
);

-- ============================================================
-- 2. perfil
-- ============================================================
CREATE TABLE "perfil" (
  "id_perfil" SERIAL NOT NULL,
  "primer_nombre" character varying(50) NOT NULL,
  "segundo_nombre" character varying(50),
  "primer_apellido" character varying(50) NOT NULL,
  "segundo_apellido" character varying(50),
  "fecha_nacimiento" date NOT NULL,
  "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
  "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
  "id_usuario" integer NOT NULL,
  CONSTRAINT "REL_perfil_id_usuario" UNIQUE ("id_usuario"),
  CONSTRAINT "PK_perfil" PRIMARY KEY ("id_perfil")
);

-- ============================================================
-- 3. contribuyente
-- ============================================================
CREATE TABLE "contribuyente" (
  "nit" character varying(20) NOT NULL,
  "cui" character varying(20) NOT NULL,
  "nombre_empresa" character varying(50),
  "domicilio_fiscal" character varying(50) NOT NULL,
  "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
  "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
  "id_perfil" integer NOT NULL,
  CONSTRAINT "UQ_contribuyente_cui" UNIQUE ("cui"),
  CONSTRAINT "REL_contribuyente_id_perfil" UNIQUE ("id_perfil"),
  CONSTRAINT "PK_contribuyente" PRIMARY KEY ("nit")
);

-- ============================================================
-- 4. catalogo_iscv
-- ============================================================
CREATE TABLE "catalogo_iscv" (
  "codigo_iscv" character varying(30) NOT NULL,
  "marca" character varying(100) NOT NULL,
  "linea_estilo" character varying(100) NOT NULL,
  "tipo_vehiculo" character varying(50) NOT NULL,
  "valor_base" numeric(10,2) NOT NULL,
  "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
  "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "PK_catalogo_iscv" PRIMARY KEY ("codigo_iscv")
);

-- ============================================================
-- 5. vehiculo
-- ============================================================
CREATE TABLE "vehiculo" (
  "placa" character varying(30) NOT NULL,
  "codigo_unico_identificador" character varying(50) NOT NULL,
  "uso" character varying(50) NOT NULL,
  "estado" "public"."vehiculo_estado_enum" NOT NULL DEFAULT 'ACTIVO',
  "modelo" integer NOT NULL,
  "vin" character varying(50) NOT NULL,
  "serie" character varying(100) NOT NULL,
  "chasis" character varying(100) NOT NULL,
  "motor" character varying(100) NOT NULL,
  "centimetros_cubicos" integer NOT NULL,
  "asientos" integer NOT NULL,
  "cilindros" integer NOT NULL,
  "combustible" character varying(30) NOT NULL,
  "puertas" integer NOT NULL,
  "tonelaje" numeric(10,2) NOT NULL,
  "color" character varying(30) NOT NULL,
  "ejes" integer NOT NULL,
  "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
  "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
  "codigo_iscv" character varying(30) NOT NULL,
  "nit" character varying(20) NOT NULL,
  CONSTRAINT "UQ_vehiculo_codigo_unico_identificador" UNIQUE ("codigo_unico_identificador"),
  CONSTRAINT "UQ_vehiculo_vin" UNIQUE ("vin"),
  CONSTRAINT "PK_vehiculo" PRIMARY KEY ("placa")
);

-- ============================================================
-- 6. certificado_propiedad
-- ============================================================
CREATE TABLE "certificado_propiedad" (
  "no_certificado" character varying(30) NOT NULL,
  "codigo_unico_identificador" character varying(50) NOT NULL,
  "fecha_emision" date NOT NULL,
  "aduana_liquidadora" character varying(255) NOT NULL,
  "poliza_importacion" character varying(50) NOT NULL,
  "fecha_poliza" date NOT NULL,
  "franquicia_no" integer NOT NULL,
  "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
  "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
  "placa" character varying(30) NOT NULL,
  CONSTRAINT "UQ_certificado_codigo_unico_identificador" UNIQUE ("codigo_unico_identificador"),
  CONSTRAINT "PK_certificado_propiedad" PRIMARY KEY ("no_certificado")
);

-- ============================================================
-- 7. tarjeta_circulacion
-- ============================================================
CREATE TABLE "tarjeta_circulacion" (
  "no_tarjeta" character varying(30) NOT NULL,
  "fecha_registro" TIMESTAMP NOT NULL,
  "aduana_liquidadora" character varying(255) NOT NULL,
  "validahasta" date NOT NULL,
  "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
  "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
  "placa" character varying(30) NOT NULL,
  CONSTRAINT "PK_tarjeta_circulacion" PRIMARY KEY ("no_tarjeta")
);

-- ============================================================
-- 8. calcomania
-- ============================================================
CREATE TABLE "calcomania" (
  "id_calcomania" character varying(30) NOT NULL,
  "anio" integer NOT NULL,
  "estado" character varying(20) NOT NULL DEFAULT 'PENDIENTE',
  "fecha_impresion" TIMESTAMP,
  "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(),
  "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(),
  "placa" character varying(30) NOT NULL,
  "no_certificado_vigente" character varying(30) NOT NULL,
  "no_tarjeta_vigente" character varying(30) NOT NULL,
  CONSTRAINT "PK_calcomania" PRIMARY KEY ("id_calcomania")
);

-- ============================================================
-- 9. historial_vehiculo
-- ============================================================
CREATE TABLE "historial_vehiculo" (
  "id" SERIAL NOT NULL,
  "datos_anteriores" json,
  "datos_nuevos" json,
  "tipo_cambio" character varying(100) NOT NULL,
  "fecha_cambio" TIMESTAMP NOT NULL DEFAULT now(),
  "placa" character varying(30) NOT NULL,
  "id_usuario" integer,
  CONSTRAINT "PK_historial_vehiculo" PRIMARY KEY ("id")
);

-- ============================================================
-- Foreign Keys
-- ============================================================
ALTER TABLE "perfil" ADD CONSTRAINT "FK_perfil_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "contribuyente" ADD CONSTRAINT "FK_contribuyente_perfil" FOREIGN KEY ("id_perfil") REFERENCES "perfil"("id_perfil") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "vehiculo" ADD CONSTRAINT "FK_vehiculo_catalogo" FOREIGN KEY ("codigo_iscv") REFERENCES "catalogo_iscv"("codigo_iscv") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "vehiculo" ADD CONSTRAINT "FK_vehiculo_contribuyente" FOREIGN KEY ("nit") REFERENCES "contribuyente"("nit") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "certificado_propiedad" ADD CONSTRAINT "FK_certificado_vehiculo" FOREIGN KEY ("placa") REFERENCES "vehiculo"("placa") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "tarjeta_circulacion" ADD CONSTRAINT "FK_tarjeta_vehiculo" FOREIGN KEY ("placa") REFERENCES "vehiculo"("placa") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "calcomania" ADD CONSTRAINT "FK_calcomania_vehiculo" FOREIGN KEY ("placa") REFERENCES "vehiculo"("placa") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "calcomania" ADD CONSTRAINT "FK_calcomania_certificado" FOREIGN KEY ("no_certificado_vigente") REFERENCES "certificado_propiedad"("no_certificado") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "calcomania" ADD CONSTRAINT "FK_calcomania_tarjeta" FOREIGN KEY ("no_tarjeta_vigente") REFERENCES "tarjeta_circulacion"("no_tarjeta") ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "historial_vehiculo" ADD CONSTRAINT "FK_historial_vehiculo" FOREIGN KEY ("placa") REFERENCES "vehiculo"("placa") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "historial_vehiculo" ADD CONSTRAINT "FK_historial_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;
