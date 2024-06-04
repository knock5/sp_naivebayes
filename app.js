const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashSelvi = await bcrypt.hash('selvi123', 10);
  const hashSilpi = await bcrypt.hash('silpi123', 10);

  await prisma.role.createMany({
    data: [
      {
        nama: 'admin',
      },
      {
        nama: 'bendahara',
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        nama: 'selvi',
        email: 'selvi@gmail.com',
        password: hashSelvi,
        role: {
          connect: {
            role_id: 1,
          },
        },
      },
      {
        nama: 'selvi',
        email: 'selvi@gmail.com',
        password: hashSilpi,
        role: {
          connect: {
            role_id: 2,
          },
        },
      },
    ],
  });

  const allUsers = await prisma.user.findMany();

  console.dir(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
