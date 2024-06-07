/*
  Warnings:

  - Made the column `telegramId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "telegramId" SET NOT NULL;
