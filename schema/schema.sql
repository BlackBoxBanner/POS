create table if not exists public.branches (
  id uuid not null default gen_random_uuid (),
  branch_name character varying not null,
  created_at timestamp with time zone not null default now(),
  phone_number bigint not null,
  constraint addresses_pkey primary key (id),
  constraint addresses_branch_name_key unique (branch_name)
) tablespace pg_default;

create table if not exists public.tables (
  id uuid not null default gen_random_uuid (),
  seat smallint not null,
  created_at timestamp with time zone not null default now(),
  table_number smallint not null,
  constraint tables_pkey primary key (id),
  constraint tables_table_number_key unique (table_number)
) tablespace pg_default;

create table if not exists public.employees (
  id uuid not null default gen_random_uuid (),
  email character varying not null,
  name character varying not null,
  created_at timestamp with time zone not null default now(),
  branch_id uuid null,
  image text null,
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
  check_out_at timestamp with time zone null,
  seat integer not null,
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
  table_id uuid not null,
  created_at timestamp with time zone not null default now(),
  menu text not null,
  portion integer not null,
  status smallint null default '0' :: smallint,
  order number bigint generated by default as identity,
  constraint orders_pkey primary key (id),
  constraint orders_table_id_fkey foreign key (table_id) references tables (id) on update cascade on delete cascade,
  constraint orders_menu_fkey foreign key (menu) references menus (name) on update cascade
) tablespace pg_default;

create table if not exists public.history_order (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  menus jsonb [] null,
  customer_id uuid not null,
  constraint history_order_pkey primary key (id),
  constraint history_order_id_key unique (id),
  constraint history_order_customer_id_fkey foreign key (customer_id) references customers (id)
) tablespace pg_default;

create table if not exists public.customer_takeaway (
  id bigint generated by default as identity,
  created_at timestamp with time zone not null default now(),
  name text not null,
  empoplyee_id uuid not null,
  "branchI_id" uuid not null,
  constraint customer_takeaway_pkey primary key (id),
  constraint customer_takeaway_empoplyee_id_fkey foreign key (empoplyee_id) references employees (id),
  constraint customer_takeaway_branchI_id_fkey foreign key ("branchI_id") references branches (id)
) tablespace pg_default;

create table if not exists public.orders_takeaway (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  portion integer not null,
  status smallint null default '0' :: smallint,
  menus text not null,
  constraint orders_takeaway_menus_fkey foreign key (menus) references menus (name)
) tablespace pg_default;