/*
  Warnings:

  - You are about to drop the column `text` on the `navegation_rule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "navegation_rule" DROP COLUMN "text",
ALTER COLUMN "rule" SET DATA TYPE TEXT;
