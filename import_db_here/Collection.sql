create table "Collection"
(
    id                       text                 not null
        primary key,
    title                    text                 not null,
    "numberOfBooks"          integer              not null,
    "isAvailableForPurchase" boolean default true not null,
    price                    integer              not null,
    author                   text                 not null,
    rating                   double precision     not null
);

alter table "Collection"
    owner to sirojiddin;

INSERT INTO public."Collection" (id, title, "numberOfBooks", "isAvailableForPurchase", price, author, rating) VALUES ('clwdkeph900044aqy8u1vddo3', 'Классика 19 века', 3, true, 299990, 'Smart Reading', 4.5);
