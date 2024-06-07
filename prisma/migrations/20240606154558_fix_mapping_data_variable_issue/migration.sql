/*
  Warnings:

  - A unique constraint covering the columns `[mapping_id]` on the table `data_variable` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[data_variable_id]` on the table `mapping` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "data_variable" DROP CONSTRAINT "data_variable_mapping_id_fkey";

-- DropForeignKey
ALTER TABLE "mapping" DROP CONSTRAINT "mapping_data_variable_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "data_variable_mapping_id_key" ON "data_variable"("mapping_id");

-- CreateIndex
CREATE UNIQUE INDEX "mapping_data_variable_id_key" ON "mapping"("data_variable_id");

-- AddForeignKey
ALTER TABLE "mapping" ADD CONSTRAINT "mapping_data_variable_id_fkey" FOREIGN KEY ("data_variable_id") REFERENCES "data_variable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
