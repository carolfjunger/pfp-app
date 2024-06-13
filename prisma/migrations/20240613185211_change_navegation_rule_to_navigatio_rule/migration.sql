/*
  Warnings:

  - You are about to drop the `navegation_rule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "navegation_rule" DROP CONSTRAINT "navegation_rule_option_id_fkey";

-- DropForeignKey
ALTER TABLE "navegation_rule" DROP CONSTRAINT "navegation_rule_question_id_fkey";

-- DropTable
DROP TABLE "navegation_rule";

-- CreateTable
CREATE TABLE "navigation_rule" (
    "id" SERIAL NOT NULL,
    "rule" TEXT NOT NULL,
    "question_id" INTEGER,
    "option_id" INTEGER,

    CONSTRAINT "navigation_rule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "navigation_rule" ADD CONSTRAINT "navigation_rule_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "navigation_rule" ADD CONSTRAINT "navigation_rule_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
