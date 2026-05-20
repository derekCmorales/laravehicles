-- ============================================================
-- Inserts SQL - LaraVehicles
-- Datos de ejemplo para ambiente de desarrollo
-- ============================================================

-- ============================================================
-- 1. Usuarios
-- Passwords: admin123 (admin) | user123 (juan.perez)
-- ============================================================
INSERT INTO "usuario" ("username", "password", "rol") VALUES
  ('admin', '$2b$10$kgKROsiQYlw/FfVDgyUuxeWRIBI9Np6Vu4PsljS5R0IU1lkMlJzPm', 'ADMIN'),
  ('juan.perez', '$2b$10$Piwm5a9OxUKyj6zK7FQfm.KvD5bP5TYHQa8rh4hc//Grb1Y5.YGZG', 'USER');

-- ============================================================
-- 2. Perfiles
-- ============================================================
INSERT INTO "perfil" ("primer_nombre", "segundo_nombre", "primer_apellido", "segundo_apellido", "fecha_nacimiento", "id_usuario") VALUES
  ('Administrador', NULL, 'Sistema', NULL, '1990-01-01', 1),
  ('Juan', 'Antonio', 'Perez', 'Garcia', '1985-05-15', 2);

-- ============================================================
-- 3. Contribuyentes
-- ============================================================
INSERT INTO "contribuyente" ("nit", "cui", "nombre_empresa", "domicilio_fiscal", "id_perfil") VALUES
  ('1234567-8', '1234567890101', 'Empresa Admin S.A.', '1a Avenida 10-50 Zona 1', 1),
  ('8765432-1', '1098765432101', NULL, '5a Calle 22-10 Zona 5', 2);

-- ============================================================
-- 4. Catalogo ISCV
-- ============================================================
INSERT INTO "catalogo_iscv" ("codigo_iscv", "marca", "linea_estilo", "tipo_vehiculo", "valor_base") VALUES
  ('ISCV-001', 'Toyota', 'Corolla', 'SEDAN', 18500.00),
  ('ISCV-002', 'Honda', 'Civic', 'SEDAN', 22000.00),
  ('ISCV-003', 'Ford', 'F-150', 'PICKUP', 35000.00),
  ('ISCV-004', 'Mazda', 'CX-5', 'SUV', 28000.00),
  ('ISCV-005', 'Suzuki', 'Swift', 'HATCHBACK', 14500.00);

-- ============================================================
-- 5. Vehiculos
-- ============================================================
INSERT INTO "vehiculo" (
  "placa", "codigo_unico_identificador", "uso", "estado", "modelo", "vin",
  "serie", "chasis", "motor", "centimetros_cubicos", "asientos", "cilindros",
  "combustible", "puertas", "tonelaje", "color", "ejes", "codigo_iscv", "nit"
) VALUES
  ('P123ABC', 'CUI-2025-00001', 'Particular', 'ACTIVO', 2023, 'JTDBU4EE1B9123456',
   'SERIE001', 'CHASIS001', 'MOTOR001', 1800, 5, 4,
   'Gasolina', 4, 1.20, 'Blanco', 2, 'ISCV-001', '1234567-8'),

  ('P456DEF', 'CUI-2025-00002', 'Comercial', 'ACTIVO', 2024, '1HGBH41JXMN109876',
   'SERIE002', 'CHASIS002', 'MOTOR002', 2000, 5, 4,
   'Gasolina', 4, 1.35, 'Gris Oscuro', 2, 'ISCV-002', '8765432-1'),

  ('P789GHI', 'CUI-2025-00003', 'Particular', 'ACTIVO', 2022, '3FTTW8F94NBA11223',
   'SERIE003', 'CHASIS003', 'MOTOR003', 3500, 3, 6,
   'Diesel', 2, 2.50, 'Rojo', 2, 'ISCV-003', '1234567-8'),

  ('P321JKL', 'CUI-2025-00004', 'Particular', 'INACTIVO_ADMINISTRATIVO', 2021, 'JM1BL1H57A1122334',
   'SERIE004', 'CHASIS004', 'MOTOR004', 2500, 5, 4,
   'Gasolina', 5, 1.80, 'Azul', 2, 'ISCV-004', '8765432-1');

-- ============================================================
-- 6. Certificados de Propiedad
-- ============================================================
INSERT INTO "certificado_propiedad" (
  "no_certificado", "codigo_unico_identificador", "fecha_emision",
  "aduana_liquidadora", "poliza_importacion", "fecha_poliza", "franquicia_no", "placa"
) VALUES
  ('CERT-2025-0001', 'CUI-CERT-0001', '2023-03-15', 'Aduana Central Guatemala', 'POL-001-2023', '2023-02-10', 1, 'P123ABC'),
  ('CERT-2025-0002', 'CUI-CERT-0002', '2024-06-20', 'Aduana Puerto Santo Tomas', 'POL-002-2024', '2024-05-18', 2, 'P456DEF'),
  ('CERT-2025-0003', 'CUI-CERT-0003', '2022-11-05', 'Aduana Central Guatemala', 'POL-003-2022', '2022-10-01', 1, 'P789GHI'),
  ('CERT-2025-0004', 'CUI-CERT-0004', '2021-08-12', 'Aduana El Carmen', 'POL-004-2021', '2021-07-20', 3, 'P321JKL');

-- ============================================================
-- 7. Tarjetas de Circulacion
-- ============================================================
INSERT INTO "tarjeta_circulacion" (
  "no_tarjeta", "fecha_registro", "aduana_liquidadora", "validahasta", "placa"
) VALUES
  ('TC-2025-0001', '2023-04-01 10:30:00', 'Aduana Central Guatemala', '2026-04-01', 'P123ABC'),
  ('TC-2025-0002', '2024-07-10 14:15:00', 'Aduana Puerto Santo Tomas', '2027-07-10', 'P456DEF'),
  ('TC-2025-0003', '2022-12-01 09:00:00', 'Aduana Central Guatemala', '2025-12-01', 'P789GHI'),
  ('TC-2025-0004', '2021-09-15 11:45:00', 'Aduana El Carmen', '2024-09-15', 'P321JKL');

-- ============================================================
-- 8. Calcomanias
-- ============================================================
INSERT INTO "calcomania" (
  "id_calcomania", "anio", "estado", "fecha_impresion",
  "placa", "no_certificado_vigente", "no_tarjeta_vigente"
) VALUES
  ('CAL-2025-P123ABC', 2025, 'ACTIVA', '2025-01-15 08:00:00',
   'P123ABC', 'CERT-2025-0001', 'TC-2025-0001'),

  ('CAL-2025-P456DEF', 2025, 'PENDIENTE', NULL,
   'P456DEF', 'CERT-2025-0002', 'TC-2025-0002'),

  ('CAL-2024-P789GHI', 2024, 'ACTIVA', '2024-01-10 10:00:00',
   'P789GHI', 'CERT-2025-0003', 'TC-2025-0003'),

  ('CAL-2023-P321JKL', 2023, 'EXPIRADA', '2023-01-20 09:30:00',
   'P321JKL', 'CERT-2025-0004', 'TC-2025-0004');

-- ============================================================
-- 9. Historial de Vehiculos
-- ============================================================
INSERT INTO "historial_vehiculo" (
  "datos_anteriores", "datos_nuevos", "tipo_cambio", "placa", "id_usuario"
) VALUES
  (
    '{"estado": "ACTIVO"}',
    '{"estado": "INACTIVO_ADMINISTRATIVO"}',
    'INACTIVACION_ADMINISTRATIVA',
    'P321JKL',
    1
  ),
  (
    '{"color": "Gris"}',
    '{"color": "Gris Oscuro"}',
    'ACTUALIZACION_FICHA',
    'P456DEF',
    2
  );
