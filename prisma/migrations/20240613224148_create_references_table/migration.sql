-- CreateTable
CREATE TABLE "references" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "DOI" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "citation" TEXT NOT NULL,

    CONSTRAINT "references_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_feedbackToreferences" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_feedbackToreferences_AB_unique" ON "_feedbackToreferences"("A", "B");

-- CreateIndex
CREATE INDEX "_feedbackToreferences_B_index" ON "_feedbackToreferences"("B");

-- AddForeignKey
ALTER TABLE "_feedbackToreferences" ADD CONSTRAINT "_feedbackToreferences_A_fkey" FOREIGN KEY ("A") REFERENCES "feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_feedbackToreferences" ADD CONSTRAINT "_feedbackToreferences_B_fkey" FOREIGN KEY ("B") REFERENCES "references"("id") ON DELETE CASCADE ON UPDATE CASCADE;
