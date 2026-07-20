INSERT OR IGNORE INTO report_kind
  (id, name, display_name, is_daily, reports_amount, reports_transactions, reports_modules_amount, reports_modules_transactions)
VALUES
  (1, 'daily', 'Diario', 1, 1, 1, 0, 0),
  (2, 'monthly_amount_transactions', 'Mensual monto + transacciones', 0, 1, 1, 0, 0),
  (3, 'monthly_amount', 'Mensual monto', 0, 1, 0, 0, 0),
  (4, 'monthly_amount_transactions_modules', 'Mensual monto + transacciones + módulos', 0, 1, 1, 1, 1);

INSERT INTO user (username) VALUES
  ('admin'),
  ('operador');

INSERT INTO tenant (tenant_name, brand_name, location_name, document_number, report_kind) VALUES
  ('Cafetería El Aroma S.A.C.', 'El Aroma Café', 'Nivel 1 - Local 105', '20100123451', (SELECT id FROM report_kind WHERE name = 'daily' LIMIT 1)),
  ('Comercializadora Andina E.I.R.L.', 'Confites Andinos', 'Nivel 1 - Local 112', '20100123452', (SELECT id FROM report_kind WHERE name = 'daily' LIMIT 1)),
  ('Zapatería Paso Firme S.A.C.', 'Paso Firme', 'Nivel 2 - Local 208', '20100123453', (SELECT id FROM report_kind WHERE name = 'monthly_amount_transactions' LIMIT 1)),
  ('Moda Urbana Perú S.A.C.', 'Moda Urbana', 'Nivel 2 - Local 215', '20100123454', (SELECT id FROM report_kind WHERE name = 'monthly_amount_transactions' LIMIT 1)),
  ('Estacionamientos del Sur S.A.C.', 'Parking PSM', 'Sótano - Local 3', '20100123455', (SELECT id FROM report_kind WHERE name = 'monthly_amount' LIMIT 1)),
  ('Servicios Financieros Rápidos S.A.', 'CambiaFácil', 'Nivel 1 - Local 101', '20100123456', (SELECT id FROM report_kind WHERE name = 'monthly_amount' LIMIT 1)),
  ('Retail Group Perú S.A.C.', 'Tech Store Perú', 'Nivel 3 - Local 301', '20100123457', (SELECT id FROM report_kind WHERE name = 'monthly_amount_transactions_modules' LIMIT 1)),
  ('Grandes Almacenes del Norte S.A.', 'Almacenes del Norte', 'Nivel 1 - Local 150', '20100123458', (SELECT id FROM report_kind WHERE name = 'monthly_amount_transactions_modules' LIMIT 1));

-- Daily tenants: July 2026 month-to-date (amount + transactions only)
INSERT INTO sale_report (date, amount, transactions, tenant_id) VALUES
  ('2026-07-01', 412.50, 38, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-02', 389.00, 35, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-03', 455.20, 41, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-04', 501.75, 45, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-05', 478.30, 43, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-06', 612.00, 55, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-07', 590.40, 53, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-08', 398.60, 36, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-09', 415.90, 37, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-10', 442.10, 40, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-11', 467.85, 42, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-12', 489.50, 44, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-13', 605.75, 54, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-14', 583.20, 52, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-15', 405.40, 37, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-16', 421.60, 38, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-17', 448.90, 40, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-18', 472.30, 42, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-19', 495.10, 44, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),
  ('2026-07-20', 520.00, 47, (SELECT id FROM tenant WHERE document_number = '20100123451' LIMIT 1)),

  ('2026-07-01', 185.00, 31, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-02', 172.50, 29, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-03', 198.00, 33, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-04', 210.40, 35, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-05', 203.80, 34, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-06', 265.00, 44, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-07', 252.30, 42, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-08', 178.90, 30, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-09', 182.40, 30, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-10', 195.60, 33, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-11', 205.20, 34, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-12', 212.75, 35, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-13', 258.40, 43, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-14', 247.60, 41, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-15', 180.30, 30, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-16', 188.50, 31, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-17', 196.70, 33, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-18', 204.90, 34, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-19', 211.30, 35, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1)),
  ('2026-07-20', 218.50, 36, (SELECT id FROM tenant WHERE document_number = '20100123452' LIMIT 1));

-- Monthly tenants (amount + transactions): May and June 2026
INSERT INTO sale_report (date, amount, transactions, tenant_id) VALUES
  ('2026-05-01', 28450.00, 612, (SELECT id FROM tenant WHERE document_number = '20100123453' LIMIT 1)),
  ('2026-06-01', 31200.50, 645, (SELECT id FROM tenant WHERE document_number = '20100123453' LIMIT 1)),
  ('2026-05-01', 42300.00, 890, (SELECT id FROM tenant WHERE document_number = '20100123454' LIMIT 1)),
  ('2026-06-01', 45680.75, 921, (SELECT id FROM tenant WHERE document_number = '20100123454' LIMIT 1));

-- Monthly tenants (amount only): May and June 2026
INSERT INTO sale_report (date, amount, tenant_id) VALUES
  ('2026-05-01', 18650.00, (SELECT id FROM tenant WHERE document_number = '20100123455' LIMIT 1)),
  ('2026-06-01', 19420.00, (SELECT id FROM tenant WHERE document_number = '20100123455' LIMIT 1)),
  ('2026-05-01', 9850.00, (SELECT id FROM tenant WHERE document_number = '20100123456' LIMIT 1)),
  ('2026-06-01', 10230.50, (SELECT id FROM tenant WHERE document_number = '20100123456' LIMIT 1));

-- Monthly tenants (amount + transactions + modules): May and June 2026
INSERT INTO sale_report (date, amount, transactions, modules_amount, modules_transactions, tenant_id) VALUES
  ('2026-05-01', 68400.00, 1450, 12300.00, 210, (SELECT id FROM tenant WHERE document_number = '20100123457' LIMIT 1)),
  ('2026-06-01', 72150.25, 1512, 13580.50, 234, (SELECT id FROM tenant WHERE document_number = '20100123457' LIMIT 1)),
  ('2026-05-01', 95600.00, 2100, 21400.00, 380, (SELECT id FROM tenant WHERE document_number = '20100123458' LIMIT 1)),
  ('2026-06-01', 99870.40, 2185, 22650.75, 402, (SELECT id FROM tenant WHERE document_number = '20100123458' LIMIT 1));
