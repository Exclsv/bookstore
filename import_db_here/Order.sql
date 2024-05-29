create table "Order"
(
    id             text                                     not null
        primary key,
    price          integer                                  not null,
    "createdAt"    timestamp(3) default CURRENT_TIMESTAMP   not null,
    "updatedAt"    timestamp(3)                             not null,
    "userId"       text                                     not null
        references "User"
            on update cascade on delete cascade,
    "bookId"       text
        references "Book"
            on update cascade on delete restrict,
    "collectionId" text
        references "Collection"
            on update cascade on delete restrict,
    "orderType"    "OrderType"  default 'BOOK'::"OrderType" not null
);

alter table "Order"
    owner to sirojiddin;

INSERT INTO public."Order" (id, price, "createdAt", "updatedAt", "userId", "bookId", "collectionId", "orderType") VALUES ('clwc9wcrj0001otpbjy37clyc', 128997, '2024-05-18 15:38:20.959', '2024-05-18 15:38:20.959', 'clvzim6ss000013mdm9culfzo', 'clw3xd9dp0000chv4za7vayny', null, 'BOOK');
INSERT INTO public."Order" (id, price, "createdAt", "updatedAt", "userId", "bookId", "collectionId", "orderType") VALUES ('clwddijsl0009ht1fscka4kiz', 215990, '2024-05-19 10:07:21.525', '2024-05-19 10:07:21.525', 'clvycjj9b0001v2e6kh8w7a1r', 'clw3xjwpr0001chv449m01c9h', null, 'BOOK');
INSERT INTO public."Order" (id, price, "createdAt", "updatedAt", "userId", "bookId", "collectionId", "orderType") VALUES ('clwddkb6100014aqydeqguwgx', 109990, '2024-05-19 10:08:43.657', '2024-05-19 10:08:43.657', 'clvycjj9b0001v2e6kh8w7a1r', 'clwdb6b7k0002otpbwss3q9tg', null, 'BOOK');
INSERT INTO public."Order" (id, price, "createdAt", "updatedAt", "userId", "bookId", "collectionId", "orderType") VALUES ('clwddl17s00034aqyk4n0srab', 128997, '2024-05-19 10:09:17.416', '2024-05-19 10:09:17.416', 'clvycjj9b0001v2e6kh8w7a1r', 'clw3xd9dp0000chv4za7vayny', null, 'BOOK');
INSERT INTO public."Order" (id, price, "createdAt", "updatedAt", "userId", "bookId", "collectionId", "orderType") VALUES ('clwkkwr3o0001d9yyuj1f0yvf', 299990, '2024-05-24 11:08:44.724', '2024-05-24 11:08:44.724', 'clvycjj9b0001v2e6kh8w7a1r', null, 'clwdkeph900044aqy8u1vddo3', 'BOOK');
