create table "delivery_zone" (
  "id" serial primary key,
  "title" varchar(30) not null unique,
  "polygon" GEOGRAPHY(POLYGON,4326) not null
);
