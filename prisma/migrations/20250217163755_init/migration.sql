/*
  Warnings:

  - You are about to drop the `Gato` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Gato";

-- CreateTable
CREATE TABLE "Cat" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cat_pkey" PRIMARY KEY ("id")
);
