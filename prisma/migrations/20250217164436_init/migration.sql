/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `Cat` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Cat` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `Cat` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Cat` table. All the data in the column will be lost.
  - Added the required column `description` to the `Cat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Cat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Cat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Cat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cat" DROP COLUMN "criadoEm",
DROP COLUMN "descricao",
DROP COLUMN "imagem",
DROP COLUMN "nome",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
