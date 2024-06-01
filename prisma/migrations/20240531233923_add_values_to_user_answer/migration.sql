/*
  Warnings:

  - Added the required column `value` to the `user_answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_answer" ADD COLUMN     "value" TEXT NOT NULL;
