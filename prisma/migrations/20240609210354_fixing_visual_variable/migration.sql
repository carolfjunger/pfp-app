/*
  Warnings:

  - A unique constraint covering the columns `[visual_variable_id]` on the table `mapping` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "visual_variable_type" AS ENUM ('title');

-- DropForeignKey
ALTER TABLE "mapping" DROP CONSTRAINT "mapping_visual_variable_id_fkey";

-- DropForeignKey
ALTER TABLE "visual_variable" DROP CONSTRAINT "visual_variable_mapping_id_fkey";

-- AlterTable
ALTER TABLE "visual_variable" ADD COLUMN     "type" "visual_variable_type";

-- CreateIndex
CREATE UNIQUE INDEX "mapping_visual_variable_id_key" ON "mapping"("visual_variable_id");

-- AddForeignKey
ALTER TABLE "mapping" ADD CONSTRAINT "mapping_visual_variable_id_fkey" FOREIGN KEY ("visual_variable_id") REFERENCES "visual_variable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
