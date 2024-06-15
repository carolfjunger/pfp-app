/*
  Warnings:

  - You are about to drop the `graph_types_on_question_group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "graph_types_on_question_group" DROP CONSTRAINT "graph_types_on_question_group_graph_types_id_fkey";

-- DropForeignKey
ALTER TABLE "graph_types_on_question_group" DROP CONSTRAINT "graph_types_on_question_group_question_group_id_fkey";

-- DropTable
DROP TABLE "graph_types_on_question_group";

-- CreateTable
CREATE TABLE "_graph_typesToquestion_group" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_graph_typesToquestion_group_AB_unique" ON "_graph_typesToquestion_group"("A", "B");

-- CreateIndex
CREATE INDEX "_graph_typesToquestion_group_B_index" ON "_graph_typesToquestion_group"("B");

-- AddForeignKey
ALTER TABLE "_graph_typesToquestion_group" ADD CONSTRAINT "_graph_typesToquestion_group_A_fkey" FOREIGN KEY ("A") REFERENCES "graph_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_graph_typesToquestion_group" ADD CONSTRAINT "_graph_typesToquestion_group_B_fkey" FOREIGN KEY ("B") REFERENCES "question_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
