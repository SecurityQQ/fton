-- AlterTable
ALTER TABLE "User" ADD COLUMN     "addedToAttachmentMenu" BOOLEAN DEFAULT false,
ADD COLUMN     "allowsWriteToPm" BOOLEAN DEFAULT false,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "isBot" BOOLEAN DEFAULT false,
ADD COLUMN     "isPremium" BOOLEAN DEFAULT false,
ADD COLUMN     "languageCode" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "username" TEXT,
ALTER COLUMN "birthdate" DROP NOT NULL,
ALTER COLUMN "lastPeriodDate" DROP NOT NULL,
ALTER COLUMN "lastPeriodDate" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "telegramId_index" ON "User"("telegramId");
