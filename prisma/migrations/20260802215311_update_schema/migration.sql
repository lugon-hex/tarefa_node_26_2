/*
  Warnings:

  - Added the required column `priority` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "priority" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
