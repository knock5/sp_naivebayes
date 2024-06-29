const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const homeController = {
  async dashView(req, res) {
    if (!req.session.userId) {
      return res.redirect('/login');
    }

    try {
      const user = await prisma.user.findUnique({
        where: { user_id: req.session.userId },
        include: { role: true },
      });

      res.render('dashboard', { user, currentPage: 'dashboard' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async createUserView(req, res) {
    const user = await prisma.user.findUnique({
      where: { user_id: req.session.userId },
      include: { role: true },
    });

    res.render('admin/create', { user, currentPage: 'users' });
  },

  async createCustView(req, res) {
    const user = await prisma.user.findUnique({
      where: { user_id: req.session.userId },
      include: { role: true },
    });

    res.render('user/cscreate', { user, currentPage: 'csview' });
  },

  async createCust(req, res) {
    try {
      const {
        nama,
        umur,
        status_pernikahan,
        pekerjaan,
        penghasilan,
        jaminan,
        tempat_tinggal,
        hasil,
      } = req.body;

      // Validasi data input
      if (
        !nama ||
        !umur ||
        !status_pernikahan ||
        !pekerjaan ||
        !jaminan ||
        !penghasilan ||
        !tempat_tinggal
      ) {
        console.error('Data tidak lengkap:', req.body);
        return res.status(400).send('All fields are required');
      }

      // Buat data nasabah baru
      const dataCreate = await prisma.cust.create({
        data: {
          nama,
          umur: parseInt(umur, 10),
          status_pernikahan,
          pekerjaan,
          penghasilan,
          jaminan,
          tempat_tinggal,
          hasil,
        },
      });

      console.log(dataCreate);

      res.redirect('/csview?success=1');
    } catch (error) {
      console.error('Error creating cust:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  async editCustView(req, res) {
    try {
      const { id } = req.params;

      const cust = await prisma.cust.findUnique({
        where: { cust_id: parseInt(id) },
      });

      const user = await prisma.user.findUnique({
        where: { user_id: req.session.userId },
        include: { role: true },
      });

      if (!cust) {
        return res.status(404).send('Nasabah tidak ditemukan');
      }

      res.render('user/csedit', { cust, user, currentPage: 'csview' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async updateCust(req, res) {
    try {
      const { id } = req.params;
      const {
        nama,
        umur,
        status_pernikahan,
        pekerjaan,
        penghasilan,
        tempat_tinggal,
        hasil,
      } = req.body;

      await prisma.cust.update({
        where: { cust_id: parseInt(id) },
        data: {
          nama,
          umur: parseInt(umur),
          status_pernikahan,
          pekerjaan,
          penghasilan,
          tempat_tinggal,
          hasil,
        },
      });

      res.redirect('/csview?success=1');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async deleteCust(req, res) {
    try {
      const { id } = req.params;
      await prisma.cust.delete({
        where: { cust_id: parseInt(id) },
      });
      res.redirect('/csview?success=2');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async getUsers(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id: req.session.userId },
        include: { role: true },
      });
      const users = await prisma.user.findMany({
        include: { role: true },
      });
      const success = req.query.success;

      res.render('admin/users', { users, user, currentPage: 'users', success });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await prisma.user.delete({
        where: { user_id: parseInt(id) },
      });
      res.redirect('/users?success=2');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async getCusts(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id: req.session.userId },
        include: { role: true },
      });
      const custs = await prisma.cust.findMany();

      res.render('custs', { custs, user, currentPage: 'custs' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async getCustsRead(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id: req.session.userId },
        include: { role: true },
      });
      const custs = await prisma.cust.findMany();
      const success = req.query.success;

      res.render('csview', { custs, user, currentPage: 'csview', success });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  async getPrediksiView(req, res) {
    const user = await prisma.user.findUnique({
      where: { user_id: req.session.userId },
      include: { role: true },
    });

    res.render('user/prediksi', {
      user,
      currentPage: 'prediksi',
    });
  },

  async getAllDatasets(req, res) {
    const response = await prisma.dataset.findMany();

    res.json(response);
  },

  async getRoles(req, res) {
    const roles = await prisma.role.findMany();
    res.json(roles);
  },
};

module.exports = homeController;
