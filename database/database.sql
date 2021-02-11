-- Create Tables

-- User table
create table if not exists "user"
(
    id       uuid    default uuid_generate_v4() not null
        constraint user_pkey
            primary key,
    username text                               not null
        constraint username_unique
            unique,
    password text                               not null,
    active   boolean default true               not null
);

-- Instance table

create table if not exists instance
(
    id     uuid    default uuid_generate_v4() not null
        constraint instance_pk
            primary key,
    name   text                               not null,
    active boolean default true               not null
);

create unique index if not exists instance_name_uindex
    on instance (name);

-- Subgroup table

create table if not exists subgroup
(
    id     uuid    default uuid_generate_v4() not null
        constraint subgroup_pk
            primary key,
    name   text                               not null,
    active boolean default true
);

create unique index if not exists subgroup_name_uindex
    on subgroup (name);

-- Auxes table

create table if not exists auxes
(
    id     uuid    default uuid_generate_v4() not null
        constraint auxes_pk
            primary key,
    name   text                               not null,
    active boolean default true               not null
);

create unique index if not exists auxes_name_uindex
    on auxes (name);

-- User-instance table

create table if not exists user_instance
(
    id          uuid default uuid_generate_v4() not null
        constraint user_instance_pk
            primary key,
    user_id     uuid                            not null
        constraint user_instance_user_id_fk
            references "user",
    instance_id uuid                            not null
        constraint user_instance_instance_id_fk
            references instance
);

create unique index if not exists user_instance_user_id_instance_id_uindex
    on user_instance (user_id, instance_id);

-- User-subgroup table

create table if not exists user_subgroup
(
    id          uuid default uuid_generate_v4() not null
        constraint user_subgroup_pk
            primary key,
    user_id     uuid                            not null
        constraint user_subgroup_user_id_fk
            references "user",
    subgroup_id uuid                            not null
        constraint user_subgroup_subgroup_id_fk
            references subgroup
);

create unique index if not exists user_subgroup_user_id_uindex
    on user_subgroup (user_id, subgroup_id);


-- User-auxes tables

create table if not exists user_auxes_triggers
(
    id               uuid default uuid_generate_v4() not null
        constraint user_auxes_triggers_pk
            primary key,
    user_id          uuid                            not null
        constraint user_auxes_triggers_user_id_fk
            references "user",
    available_aux_id uuid                            not null
        constraint user_auxes_triggers_auxes_id_fk
            references auxes,
    trigger_aux_id   uuid
        constraint user_auxes_triggers_auxes_id_fk_2
            references auxes
);

create unique index if not exists user_auxes_triggers_user_id_uindex
    on user_auxes_triggers (user_id, available_aux_id, trigger_aux_id);

-- Times table

create table if not exists times
(
    id          uuid      default uuid_generate_v4() not null
        constraint times_pk
            primary key,
    start       timestamp default CURRENT_DATE       not null,
    "end"       timestamp,
    user_id     uuid                                 not null
        constraint times_user_id_fk
            references "user"
            on delete set null,
    instance_id uuid                                 not null
        constraint times_instance_id_fk
            references instance,
    aux_id      uuid                                 not null
        constraint times_auxes_id_fk
            references auxes
            on delete set null
);