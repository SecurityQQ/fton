/*
  Warnings:

  - You are about to drop the column `lastFarming` on the `FarmingSession` table. All the data in the column will be lost.
  - You are about to drop the column `tokenBalance` on the `FarmingSession` table. All the data in the column will be lost.
  - Added the required column `timeFinish` to the `FarmingSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalReward` to the `FarmingSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FarmingSession" DROP COLUMN "lastFarming",
DROP COLUMN "tokenBalance",
ADD COLUMN     "prizeReceived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "timeFinish" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalReward" DOUBLE PRECISION NOT NULL;
