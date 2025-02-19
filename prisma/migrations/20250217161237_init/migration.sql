-- CreateTable
CREATE TABLE "Gato" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gato_pkey" PRIMARY KEY ("id")
);
