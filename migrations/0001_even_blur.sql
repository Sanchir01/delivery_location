CREATE TABLE IF NOT EXISTS "delivery_zone" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(30) NOT NULL,
	"polygon" geometry(point) NOT NULL
);
