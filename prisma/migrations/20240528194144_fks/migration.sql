-- CreateEnum
CREATE TYPE "aggregator_type_options" AS ENUM ('count', 'frequency', 'percentage');

-- CreateEnum
CREATE TYPE "data_variable_type" AS ENUM ('numerico', 'categorio', 'temporal');

-- CreateEnum
CREATE TYPE "graph_data_types_options" AS ENUM ('numeric', 'categoric', 'numeric and categoric', 'timeseries');

-- CreateEnum
CREATE TYPE "number_of_variables_options" AS ENUM ('single', 'multiple');

-- CreateEnum
CREATE TYPE "variables_type_options" AS ENUM ('nominal', 'ordinal');

-- CreateTable
CREATE TABLE "data_variable" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "data_type" "data_variable_type",
    "mapping_id" INTEGER,

    CONSTRAINT "data_variable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(100) NOT NULL,
    "option_id" INTEGER,
    "after_question" BOOLEAN DEFAULT false,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "graph_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "graph_data_types_option" "graph_data_types_options",
    "number_of_variables" "number_of_variables_options",
    "ordered" VARCHAR(30),

    CONSTRAINT "graph_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "graph_types_on_question_group" (
    "graph_types_id" INTEGER NOT NULL,
    "question_group_id" INTEGER NOT NULL,

    CONSTRAINT "graph_types_question_group_pk" PRIMARY KEY ("graph_types_id","question_group_id")
);

-- CreateTable
CREATE TABLE "mapping" (
    "id" SERIAL NOT NULL,
    "ordered" VARCHAR(30),
    "data_variable_id" INTEGER,
    "visual_variable_id" INTEGER,
    "variables_type" "variables_type_options",
    "visualization_id" INTEGER,

    CONSTRAINT "mapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "navegation_rule" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(100) NOT NULL,
    "rule" VARCHAR(500) NOT NULL,
    "question_id" INTEGER,
    "option_id" INTEGER,

    CONSTRAINT "navegation_rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "option" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(100) NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "question_id" INTEGER,

    CONSTRAINT "option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "question_group_id" INTEGER NOT NULL,
    "is_first_question" BOOLEAN NOT NULL DEFAULT false,
    "question_vars" VARCHAR(500),

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_group" (
    "id" SERIAL NOT NULL,
    "topic" VARCHAR(100) NOT NULL,

    CONSTRAINT "question_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_answer" (
    "id" SERIAL NOT NULL,
    "option_id" INTEGER NOT NULL,
    "question_id" INTEGER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visual_variable" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "mapping_id" INTEGER,

    CONSTRAINT "visual_variable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visualization" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "file" TEXT NOT NULL,
    "graph_types_id" INTEGER,
    "graph_data_types_option" "graph_data_types_options",

    CONSTRAINT "visualization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "data_variable" ADD CONSTRAINT "data_variable_mapping_id_fkey" FOREIGN KEY ("mapping_id") REFERENCES "mapping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "graph_types_on_question_group" ADD CONSTRAINT "graph_types_on_question_group_graph_types_id_fkey" FOREIGN KEY ("graph_types_id") REFERENCES "graph_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "graph_types_on_question_group" ADD CONSTRAINT "graph_types_on_question_group_question_group_id_fkey" FOREIGN KEY ("question_group_id") REFERENCES "question_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mapping" ADD CONSTRAINT "mapping_data_variable_id_fkey" FOREIGN KEY ("data_variable_id") REFERENCES "data_variable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mapping" ADD CONSTRAINT "mapping_visual_variable_id_fkey" FOREIGN KEY ("visual_variable_id") REFERENCES "visual_variable"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mapping" ADD CONSTRAINT "mapping_visualization_id_fkey" FOREIGN KEY ("visualization_id") REFERENCES "visualization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "navegation_rule" ADD CONSTRAINT "navegation_rule_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "navegation_rule" ADD CONSTRAINT "navegation_rule_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "option" ADD CONSTRAINT "option_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_question_group_id_fkey" FOREIGN KEY ("question_group_id") REFERENCES "question_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_answer" ADD CONSTRAINT "user_answer_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_answer" ADD CONSTRAINT "user_answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_answer" ADD CONSTRAINT "user_answer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "visual_variable" ADD CONSTRAINT "visual_variable_mapping_id_fkey" FOREIGN KEY ("mapping_id") REFERENCES "mapping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "visualization" ADD CONSTRAINT "visualization_graph_types_id_fkey" FOREIGN KEY ("graph_types_id") REFERENCES "graph_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
