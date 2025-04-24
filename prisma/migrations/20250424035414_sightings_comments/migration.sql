/*
  Warnings:

  - You are about to drop the column `time` on the `Bird` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Bird` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bird" DROP COLUMN "time",
DROP COLUMN "user";

-- CreateTable
CREATE TABLE "Sighting" (
    "id" SERIAL NOT NULL,
    "imagepath" TEXT,
    "name" TEXT NOT NULL,
    "sciname" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "userid" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Sighting_pkey" PRIMARY KEY ("id")
);
