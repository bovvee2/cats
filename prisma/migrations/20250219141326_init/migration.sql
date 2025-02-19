/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `AdoptionForm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Cat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AdoptionForm_email_key" ON "AdoptionForm"("email");

-- CreateIndex
CREATE INDEX "AdoptionForm_catId_idx" ON "AdoptionForm"("catId");

-- CreateIndex
CREATE UNIQUE INDEX "Cat_name_key" ON "Cat"("name");

-- AddForeignKey
ALTER TABLE "AdoptionForm" ADD CONSTRAINT "AdoptionForm_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Cat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
