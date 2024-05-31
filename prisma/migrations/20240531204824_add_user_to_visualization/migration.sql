-- AlterTable
ALTER TABLE "visualization" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "visualization" ADD CONSTRAINT "visualization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
