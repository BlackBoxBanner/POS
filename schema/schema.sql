create table public.branches (
  id uuid not null default gen_random_uuid (),
  branch_name character varying not null,
  created_at timestamp with time zone not null default now(),
  phone_number bigint not null,
  constraint addresses_pkey primary key (id),
  constraint addresses_branch_name_key unique (branch_name)
) tablespace pg_default;

create table public.tables (
  id uuid not null default gen_random_uuid (),
  table_number smallint not null,
  seat smallint not null,
  created_at timestamp with time zone not null default now(),
  constraint tables_pkey primary key (id)
) tablespace pg_default;

create table public.employees (
  id uuid not null default gen_random_uuid (),
  email character varying not null,
  name character varying not null,
  created_at timestamp with time zone not null default now(),
  constraint employees_pkey primary key (id),
  constraint employees_email_key unique (email)
) tablespace pg_default;

create table public.dish_types (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  name character varying not null,
  constraint dish_types_pkey primary key (id),
  constraint dish_types_name_key unique (name)
) tablespace pg_default;

create table public.customers (
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

create table public.employees_branches (
  branch_id uuid not null,
  employee_id uuid not null,
  constraint employees_branches_pkey primary key (branch_id, employee_id),
  constraint employees_branches_branch_id_fkey foreign key (branch_id) references branches (id) on delete cascade,
  constraint employees_branches_employee_id_fkey foreign key (employee_id) references employees (id) on delete cascade
) tablespace pg_default;

create table public.menus (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  name character varying not null,
  image text null,
  price numeric not null,
  status boolean not null default true,
  type uuid null,
  constraint menus_pkey primary key (id),
  constraint menus_type_fkey foreign key (type) references dish_types (id) on update cascade on delete
  set
    null
) tablespace pg_default;

create table public.orders (
  id uuid not null default gen_random_uuid (),
  status boolean not null default true,
  table_id uuid not null,
  created_at timestamp with time zone not null default now(),
  constraint orders_pkey primary key (id),
  constraint orders_table_id_fkey foreign key (table_id) references tables (id) on update cascade on delete cascade
) tablespace pg_default;

create table public.menus_orders (
  menu_id uuid not null,
  order_id uuid not null,
  constraint menus_orders_pkey primary key (menu_id, order_id),
  constraint menus_orders_menu_id_fkey foreign key (menu_id) references menus (id) on delete cascade,
  constraint menus_orders_order_id_fkey foreign key (order_id) references orders (id) on delete cascade
) tablespace pg_default;