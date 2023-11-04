create table if not exists public.branches (
  id uuid not null default gen_random_uuid (),
  branch_name character varying not null,
  created_at timestamp with time zone not null default now(),
  phone_number bigint not null,
  constraint addresses_pkey primary key (id),
  constraint addresses_branch_name_key unique (branch_name)
) tablespace pg_default;

create table public.tables (
  id uuid not null default gen_random_uuid (),
  seat smallint not null,
  created_at timestamp with time zone not null default now(),
  table_number smallint not null,
  constraint tables_pkey primary key (id),
  constraint tables_table_number_key unique (table_number)
) tablespace pg_default;

create table public.employees (
  id uuid not null default gen_random_uuid (),
  email character varying not null,
  name character varying not null,
  created_at timestamp with time zone not null default now(),
  branch_id uuid null,
  constraint employees_pkey primary key (id),
  constraint employees_email_key unique (email),
  constraint employees_branch_id_fkey foreign key (branch_id) references branches (id) on delete cascade
) tablespace pg_default;

create table if not exists public.dish_types (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  name character varying not null,
  constraint dish_types_pkey primary key (id),
  constraint dish_types_name_key unique (name)
) tablespace pg_default;

create table if not exists public.customers (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  table_id uuid not null,
  employee_id uuid not null,
  branch_id uuid not null,
  take_away boolean not null default false,
  check_out_at timestamp with time zone null,
  constraint customers_pkey primary key (id),
  constraint customers_table_id_fkey foreign key (table_id) references tables (id) on update cascade,
  constraint customers_employee_id_fkey foreign key (employee_id) references employees (id) on update cascade,
  constraint customers_branch_id_fkey foreign key (branch_id) references branches (id) on update cascade
) tablespace pg_default;

create table if not exists public.menus (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  image text null,
  price numeric not null,
  status boolean not null default true,
  type uuid null,
  name text not null,
  constraint menus_pkey primary key (id, name),
  constraint menus_name_key unique (name),
  constraint menus_type_fkey foreign key (type) references dish_types (id) on update cascade on delete
  set
    null
) tablespace pg_default;

create table if not exists public.orders (
  id uuid not null default gen_random_uuid (),
  status boolean not null default true,
  table_id uuid not null,
  created_at timestamp with time zone not null default now(),
  menu_id uuid [] null,
  constraint orders_pkey primary key (id),
  constraint orders_table_id_fkey foreign key (table_id) references tables (id) on update cascade on delete cascade
) tablespace pg_default;