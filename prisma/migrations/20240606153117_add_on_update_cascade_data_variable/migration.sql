-- DropForeignKey
ALTER TABLE "data_variable" DROP CONSTRAINT "data_variable_mapping_id_fkey";

-- AddForeignKey
ALTER TABLE "data_variable" ADD CONSTRAINT "data_variable_mapping_id_fkey" FOREIGN KEY ("mapping_id") REFERENCES "mapping"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
