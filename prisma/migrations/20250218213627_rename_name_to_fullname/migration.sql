/*
  Warnings:

  - You are about to drop the column `name` on the `AdoptionForm` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `AdoptionForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdoptionForm" DROP COLUMN "name",
ADD COLUMN     "fullname" TEXT NOT NULL;
