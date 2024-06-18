-- CreateEnum
CREATE TYPE "option_type" AS ENUM ('bigText', 'text', 'singleSelect', 'number');

-- AlterTable
ALTER TABLE "option" ADD COLUMN     "type_new" "option_type",
ALTER COLUMN "type" DROP NOT NULL;
