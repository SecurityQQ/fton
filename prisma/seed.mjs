import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Remove old seed data
  await prisma.menstruation.deleteMany();
  await prisma.invitation.deleteMany();
  await prisma.socialMedia.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const alice = await prisma.user.create({
    data: {
      name: 'Alice',
      walletAddress: '0x1234567890abcdef',
      telegramHandle: '@alice',
      birthdate: new Date('1990-01-01'),
      tokenBalance: 0,
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: 'Bob',
      walletAddress: '0xabcdef1234567890',
      telegramHandle: '@bob',
      birthdate: new Date('1992-02-02'),
      tokenBalance: 0,
    },
  });

  // Create Menstruation records
  await prisma.menstruation.createMany({
    data: [
      { date: new Date('2024-06-01'), userId: alice.id },
      { date: new Date('2024-06-02'), userId: bob.id },
    ],
  });

  // Update Token Balances
  await prisma.user.update({
    where: { id: alice.id },
    data: { tokenBalance: { increment: 10 } },
  });

  await prisma.user.update({
    where: { id: bob.id },
    data: { tokenBalance: { increment: 5 } },
  });

  // Create Invitations
  await prisma.invitation.create({
    data: {
      inviterId: alice.id,
      inviteeId: bob.id,
    },
  });

  // Create Social Media interactions
  await prisma.socialMedia.createMany({
    data: [
      { platform: 'Telegram', handle: '@femaleton', userId: alice.id },
      { platform: 'Telegram', handle: '@femaleton', userId: bob.id },
    ],
  });

  console.log('Mock data has been added.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
