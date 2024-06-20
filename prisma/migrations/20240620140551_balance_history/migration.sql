-- CreateTable
CREATE TABLE "BalanceHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BalanceHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BalanceHistory" ADD CONSTRAINT "BalanceHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
