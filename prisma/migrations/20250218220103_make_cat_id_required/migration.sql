/*
  Warnings:

  - Made the column `catId` on table `AdoptionForm` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AdoptionForm" ALTER COLUMN "catId" SET NOT NULL;
