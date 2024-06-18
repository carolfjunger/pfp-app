/*
  Warnings:

  - The `ordered` column on the `graph_types` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "graph_types" DROP COLUMN "ordered",
ADD COLUMN     "ordered" BOOLEAN;
