/*
  Warnings:

  - A unique constraint covering the columns `[userId,challengeId]` on the table `UserChallenge` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserChallenge_userId_challengeId_key" ON "UserChallenge"("userId", "challengeId");
