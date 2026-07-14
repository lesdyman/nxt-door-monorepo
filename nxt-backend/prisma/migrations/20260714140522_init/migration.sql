-- CreateEnum
CREATE TYPE "ListingSide" AS ENUM ('offer', 'order');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('active', 'closed', 'reserved');

-- CreateTable
CREATE TABLE "Listing" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "images" TEXT[],
    "side" "ListingSide" NOT NULL,
    "category" TEXT NOT NULL,
    "status" "ListingStatus" NOT NULL DEFAULT 'active',
    "userId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);
