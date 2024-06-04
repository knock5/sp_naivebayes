const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashSelvi = await bcrypt.hash('selvi123', 10);
  const hashSilpi = await bcrypt.hash('silpi123', 10);

  // await prisma.role.createMany({
  //   data: [
  //     {
  //       role_id: 1,
  //       nama: 'admin',
  //     },
  //     {
  //       role_id: 2,
  //       nama: 'bendahara',
  //     },
  //   ],
  // });

  await prisma.user.createMany({
    data: [
      {
        nama: 'selvi',
        email: 'selvi@gmail.com',
        password: hashSelvi,
        roleId: 1,
      },
      {
        nama: 'silpi',
        email: 'silpi@gmail.com',
        password: hashSilpi,
        roleId: 2,
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
