const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const homeController = {
  home(req, res) {
    res.render('login');
  },

  async dashView(req, res) {
    const user = await prisma.user.findUnique({
      where: { user_id: req.session.userId },
      include: { role: true },
    });

    res.render('dashboard', { user });
  },

  async getUsers(req, res) {
    const users = await prisma.user.findMany();
    res.json(users);
  },

  async getRoles(req, res) {
    const roles = await prisma.role.findMany();
    res.json(roles);
  },
};

module.exports = homeController;
