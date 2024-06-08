const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const homeController = {
  async dashView(req, res) {
    const user = await prisma.user.findUnique({
      where: { user_id: req.session.userId },
      include: { role: true },
    });

    res.render('dashboard', { user });
  },

  async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany({
        include: { role: true },
      });
      res.render('admin/users', { users });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async getRoles(req, res) {
    const roles = await prisma.role.findMany();
    res.json(roles);
  },
};

module.exports = homeController;
