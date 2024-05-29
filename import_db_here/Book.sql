create table "Book"
(
    id                       text                 not null
        primary key,
    title                    text                 not null,
    slogan                   text                 not null,
    author                   text                 not null,
    rating                   double precision     not null,
    published                timestamp(3)         not null,
    "isAvailableForPurchase" boolean default true not null,
    pages                    integer              not null,
    "imageSrc"               text                 not null,
    description              text                 not null,
    genre                    text[],
    tags                     text[],
    formats                  text[],
    price                    integer              not null,
    "filePath"               text                 not null,
    "collectionId"           text
                                                  references "Collection"
                                                      on update cascade on delete set null
);

alter table "Book"
    owner to sirojiddin;

INSERT INTO public."Book" (id, title, slogan, author, rating, published, "isAvailableForPurchase", pages, "imageSrc", description, genre, tags, formats, price, "filePath", "collectionId") VALUES ('clw3xd9dp0000chv4za7vayny', 'Война и мир', 'Эпическая сага о любви и войне', 'Лев Толстой', 4.9, '1981-09-12 00:00:00.000', true, 1219, '/books/03572726-2b92-46ee-b29b-86bb2abe8414-voynamir.webp', 'Роман Льва Толстого, написанный с 1863 по 1869 год и опубликованный в 1869—1870 годах. Классическое произведение мировой литературы, описывающее события войн против Наполеона. Роман раскрывает не только военные действия, но и жизнь русского общества в период войн и мирного времени. Главная тема произведения — поиск истины о жизни и смысле существования человека.', '{Классическая литература, Исторический роман}', '{Шедевры мировой литературы, Исторические произведения}', '{pdf,epub,mobi,fb2,mp3}', 128997, 'books/94285791-5d2b-4708-891a-136f26153882-voynamir.webp', 'clwdkeph900044aqy8u1vddo3');
INSERT INTO public."Book" (id, title, slogan, author, rating, published, "isAvailableForPurchase", pages, "imageSrc", description, genre, tags, formats, price, "filePath", "collectionId") VALUES ('clw1ypnil00006acxas0iluma', 'test', 'test', 'test', 3.1, '2024-05-03 00:00:00.000', true, 123, '/books/a94a39e7-5a42-4a46-89a1-437a422813ea-A_painting_of_a_sunset_over_a_body_of_water_a_d.jpg', 'dsagdasgasg', '{Horror, Thriller}', '{Best horror 2023, Top 10 thriller novels}', '{pdf,epub,mobi,fb2,mp3}', 123441, 'books/20f43bec-4b33-4d43-bb3b-3c2bba702ef0-clearoff.jpeg', null);
INSERT INTO public."Book" (id, title, slogan, author, rating, published, "isAvailableForPurchase", pages, "imageSrc", description, genre, tags, formats, price, "filePath", "collectionId") VALUES ('clwdb6b7k0002otpbwss3q9tg', 'Анна Каренина', 'История трагической любви', 'Лев Толстой', 4.8, '1988-09-12 00:00:00.000', true, 864, '/books/c1057078-862c-4475-834c-01a24c9bb976-korenina.webp', 'Роман Льва Толстого, написанный в 1873—1877 годах и впервые опубликованный в 1877 году. Один из самых известных и признанных шедевров мировой литературы. История трагической любви Анны Карениной и Алексея Вронского разворачивается на фоне жизни высшего света России XIX века. Главные темы произведения — любовь, брак, верность, нравственность и социальные нормы.', '{Классическая литература, Роман о любви}', '{Шедевры мировой литературы, Романтические произведения}', '{pdf,epub,mobi,fb2,mp3}', 109990, 'books/84590925-f098-47a0-8211-9c994dbf961a-korenina.webp', 'clwdkeph900044aqy8u1vddo3');
INSERT INTO public."Book" (id, title, slogan, author, rating, published, "isAvailableForPurchase", pages, "imageSrc", description, genre, tags, formats, price, "filePath", "collectionId") VALUES ('clw3xjwpr0001chv449m01c9h', 'Братья Карамазовы', 'Глубокий психологический портрет человечества', 'Фёдор Достоевский', 4.7, '1890-07-23 00:00:00.000', true, 873, '/books/d849186e-1ff0-4e59-9415-7486987154e7-karamazovi.webp', 'Роман Фёдора Достоевского, написанный им с 1878 по 1880 годы и опубликованный в 1880 году. Последнее произведение писателя, ставшее венцом его творчества. Роман рассказывает о семье Карамазовых, чья жизнь и отношения становятся предметом глубокого психологического анализа. Главные темы произведения — вопросы веры, справедливости и нравственности.', '{Классическая литература, Философский роман}', '{Шедевры мировой литературы, Философские произведения}', '{pdf,epub,mobi,fb2,mp3}', 215990, 'books/c9f4d1ff-a7b4-480b-b194-3450fdba18d1-karamazovi.webp', 'clwdkeph900044aqy8u1vddo3');
