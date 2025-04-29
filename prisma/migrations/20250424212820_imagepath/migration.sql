/*
  Warnings:

  - Made the column `imagepath` on table `Bird` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imagepath` on table `Sighting` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bird" ALTER COLUMN "imagepath" SET NOT NULL;

-- AlterTable
ALTER TABLE "Sighting" ALTER COLUMN "imagepath" SET NOT NULL;
