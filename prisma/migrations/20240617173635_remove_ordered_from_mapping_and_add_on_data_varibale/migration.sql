/*
  Warnings:

  - You are about to drop the column `ordered` on the `mapping` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ordered_data_variable_option" AS ENUM ('descending', 'ascending');

-- AlterTable
ALTER TABLE "data_variable" ADD COLUMN     "ordered" "ordered_data_variable_option";

-- AlterTable
ALTER TABLE "mapping" DROP COLUMN "ordered";
