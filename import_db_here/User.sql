create table "User"
(
    id       text not null
        primary key,
    email    text not null,
    password text not null,
    role     text not null
);

alter table "User"
    owner to sirojiddin;

create unique index "User_email_key"
    on "User" (email);

INSERT INTO public."User" (id, email, password, role) VALUES ('clvycjj9b0001v2e6kh8w7a1r', 'admin@gmail.com', '$2b$12$84Dtsr41JYBMnhlJwXTB6.EGDvikUUy4BHetQkMObMYt6hQe.W56.', 'admin');
INSERT INTO public."User" (id, email, password, role) VALUES ('clvzim6ss000013mdm9culfzo', 'test@gmail.com', '$2b$12$1ksFIgs66glul2DGlWqNs.q2oEMfJZRPpxg.H9lHe0Rj7WcXe0iBK', 'customer');
INSERT INTO public."User" (id, email, password, role) VALUES ('clvzitbnr000113mdyn9yg1qu', 'mymommy@gmail.com', '$2b$12$b8nvOhWZZB7JuhICEIP3W.Z7RJff57z1j3g9qI7jxl8sue4COF0bS', 'customer');
INSERT INTO public."User" (id, email, password, role) VALUES ('clvziuc28000213md0tq04ybx', 'bitewa9146@fashlend.com', '$2b$12$zU8q11azzj6dJiDj1lW.O..F66YYfk4Bu5JjhwvHqb36CXiWnBLg6', 'customer');
INSERT INTO public."User" (id, email, password, role) VALUES ('clvzj1psd000413mduqrs9hr9', 'test2@gmail.com', '$2b$12$eq10VwWeBRT22BpP2J.Q0u207Q0nfvfX3cDt8pQ91Aj5Hdj4.jkQm', 'customer');
INSERT INTO public."User" (id, email, password, role) VALUES ('clvzj3h6s000513mdgi41r8oa', 'test3@gmail.com', '$2b$12$ODwxhTOhfW17h9SkvA2cxune/hKfemgfG55TMq9JJ.mvtckAQNkV.', 'customer');
INSERT INTO public."User" (id, email, password, role) VALUES ('clvzj3nr4000613mdkcxj7ftd', 'test4@gmail.com', '$2b$12$KMk5D.AbQLfcTZuELUteQumpXYtwEblTCdJ9XNpvjm9e9QbxJ5nfC', 'customer');
INSERT INTO public."User" (id, email, password, role) VALUES ('clvzj41pt000713md5qvpukhh', 'test5@gmail.com', '$2b$12$Ii/N/5B.MpFq6fSSElatsuKG8Zld6WoHkALw7t/sD0hXuj5WC1d8m', 'customer');
