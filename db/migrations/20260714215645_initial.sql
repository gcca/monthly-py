-- migrate:up
create table user (
  id integer primary key autoincrement,
  username text not null,
  created_at text default current_timestamp
);

create table tenant (
  id integer primary key autoincrement,
  tenant_name text,
  brand_name text,
  location_name text,
  document_number text,
  report_kind integer not null references report_kind(id),
  created_at text default current_timestamp
);

create table report_kind (
  id integer primary key autoincrement,
  name text not null,
  display_name text not null,
  is_daily integer not null,
  reports_amount integer not null,
  reports_transactions integer not null,
  reports_modules_amount integer not null,
  reports_modules_transactions integer not null,
  created_at text default current_timestamp
);


create table sale_report (
  id integer primary key autoincrement,
  date text not null,
  amount real,
  transactions integer,
  modules_amount real,
  modules_transactions integer,
  tenant_id integer not null references tenant(id),
  created_at text default current_timestamp
);


-- migrate:down
drop table if exists sale_report;
drop table if exists tenant;
drop table if exists user;
drop table if exists report_kind;
