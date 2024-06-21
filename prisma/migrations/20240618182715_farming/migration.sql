-- CreateTable
CREATE TABLE "FarmingSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lastFarming" TIMESTAMP(3) NOT NULL,
    "tokenBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FarmingSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FarmingSession_userId_key" ON "FarmingSession"("userId");

-- AddForeignKey
ALTER TABLE "FarmingSession" ADD CONSTRAINT "FarmingSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
