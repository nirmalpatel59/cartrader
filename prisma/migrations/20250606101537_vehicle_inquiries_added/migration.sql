/*
  Warnings:

  - You are about to drop the `inquiries` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('AVAILABLE', 'SOLD', 'PENDING');

-- DropForeignKey
ALTER TABLE "inquiries" DROP CONSTRAINT "inquiries_listingId_fkey";

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "archive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "ListingStatus" NOT NULL DEFAULT 'AVAILABLE';

-- DropTable
DROP TABLE "inquiries";

-- CreateTable
CREATE TABLE "sale_inquiries" (
    "id" SERIAL NOT NULL,
    "listingId" INTEGER NOT NULL,
    "userId" TEXT,
    "message" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "price" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sale_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_sales" (
    "id" SERIAL NOT NULL,
    "listingId" INTEGER NOT NULL,
    "paymentId" TEXT,
    "buyerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "buyerEmail" TEXT NOT NULL,
    "buyerPhone" TEXT NOT NULL,
    "buyerName" TEXT,
    "salePrice" INTEGER,
    "saleDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_sales_listingId_key" ON "vehicle_sales"("listingId");

-- AddForeignKey
ALTER TABLE "sale_inquiries" ADD CONSTRAINT "sale_inquiries_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_sales" ADD CONSTRAINT "vehicle_sales_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
