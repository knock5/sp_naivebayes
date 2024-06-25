const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const AuthController = {
  loginView(req, res) {
    res.render('login');
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.userId = user.user_id;
        req.session.roleId = user.roleId;
        res.redirect('/dashboard');
      } else {
        res.redirect('/login');
      }
    } catch (error) {
      res.status(500).json('Terjadi kesalahan teknis :', error);
    }
  },

  async register(req, res) {
    const { nama, email, password } = req.body;

    // Cek email
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).send('Email sudah terdaftar');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        nama,
        email,
        password: hashedPassword,
        roleId: 2,
      },
    });

    res.redirect('/users?success=1');
  },

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect('/');
      }
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  },
};

module.exports = AuthController;
