/*
  Warnings:

  - Added the required column `owner` to the `Sighting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sighting" ADD COLUMN     "owner" TEXT NOT NULL;
