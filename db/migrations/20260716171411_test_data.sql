-- migrate:up
insert into report_kind (id, name, display_name, is_daily, reports_amount, reports_transactions, reports_modules_amount, reports_modules_transactions) values
(1, 'daily', 'Diario', 1, 1, 1, 0, 0),
(2, 'monthly_amount_transactions', 'Mensual monto + transacciones', 0, 1, 1, 0, 0),
(3, 'monthly_amount', 'Mensual monto', 0, 1, 0, 0, 0),
(4, 'monthly_amount_transactions_modules', 'Mensual monto + transacciones + módulos', 0, 1, 1, 1, 1);

insert into tenant (tenant_name, brand_name, location_name, document_number, report_kind) values
('Tenant 1', 'Brand A', 'Location X', 'DOC123', 1),
('Tenant 2', 'Brand B', 'Location Y', 'DOC456', 2),
('Tenant 3', 'Brand C', 'Location Z', 'DOC789', 4),
('Tenant 4', 'Brand D', 'Location W', 'DOC012', 4);


-- migrate:down

