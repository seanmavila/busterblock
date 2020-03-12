create table users (
    uid int primary key,
    name varchar(45) not null,
    priv int not null,
    pass varchar(16) not null
);

create table rentals (
    uid int primary key not null,
    mid int not null,
    rented date
);

create table movies (
    mid int primary key,
    title varchar(45) not null,
    genere varchar(16)
);