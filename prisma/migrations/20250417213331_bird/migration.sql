/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Stuff` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- DropTable
DROP TABLE "Stuff";

-- DropEnum
DROP TYPE "Condition";

-- CreateTable
CREATE TABLE "Bird" (
    "id" SERIAL NOT NULL,
    "imagepath" TEXT,
    "name" TEXT NOT NULL,
    "sciname" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Bird_pkey" PRIMARY KEY ("id")
);
