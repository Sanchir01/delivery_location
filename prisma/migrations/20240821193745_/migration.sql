/*
  Warnings:

  - You are about to drop the `Point` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PointOfInterest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PointOfInterest" DROP CONSTRAINT "PointOfInterest_pointId_fkey";

-- DropTable
DROP TABLE "Point";

-- DropTable
DROP TABLE "PointOfInterest";
