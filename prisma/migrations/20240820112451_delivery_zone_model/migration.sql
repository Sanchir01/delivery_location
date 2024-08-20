-- CreateTable
CREATE TABLE "DeliveryZone" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "polygon" geography(polygon, 4326) NOT NULL,

    CONSTRAINT "DeliveryZone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryZone_title_key" ON "DeliveryZone"("title");
