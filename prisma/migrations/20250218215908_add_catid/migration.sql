/*
  Warnings:

  - Added the required column `catId` to the `AdoptionForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdoptionForm" ADD COLUMN     "catId" INTEGER NOT NULL;
