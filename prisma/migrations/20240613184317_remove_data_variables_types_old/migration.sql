/*
  Warnings:

  - The values [numerico,categorio,temporal] on the enum `data_variable_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "data_variable_type_new" AS ENUM ('numeric', 'categoric', 'timeseries');
ALTER TABLE "data_variable" ALTER COLUMN "data_type" TYPE "data_variable_type_new" USING ("data_type"::text::"data_variable_type_new");
ALTER TYPE "data_variable_type" RENAME TO "data_variable_type_old";
ALTER TYPE "data_variable_type_new" RENAME TO "data_variable_type";
DROP TYPE "data_variable_type_old";
COMMIT;
