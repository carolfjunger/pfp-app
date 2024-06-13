-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_option_id_fkey";

-- AlterTable
ALTER TABLE "feedback" ADD COLUMN     "question_id" INTEGER;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
