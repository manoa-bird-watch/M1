-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('excellent', 'good', 'fair', 'poor');

-- CreateTable
CREATE TABLE "Stuff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "condition" "Condition" NOT NULL DEFAULT 'good',
    "owner" TEXT NOT NULL,

    CONSTRAINT "Stuff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);
