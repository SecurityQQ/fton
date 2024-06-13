/*
  Warnings:

  - Changed the type of `telegramId` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
-- Add a new column for the bigint telegramId
ALTER TABLE "User" ADD COLUMN "new_telegramId" BIGINT;

-- Update the new column with the integer values from the old column
UPDATE "User" SET "new_telegramId" = CAST("telegramId" AS BIGINT);

-- Ensure there are no conflicts in unique values before dropping the old column
-- This step is crucial to ensure data integrity and to avoid runtime errors.
-- If there are any conflicts, you will need to resolve them manually.

-- Drop the old telegramId column
ALTER TABLE "User" DROP COLUMN "telegramId";

-- Rename the new column to telegramId
ALTER TABLE "User" RENAME COLUMN "new_telegramId" TO "telegramId";

-- Add the unique constraint back to the new telegramId column
ALTER TABLE "User" ADD CONSTRAINT "User_telegramId_key" UNIQUE ("telegramId");
