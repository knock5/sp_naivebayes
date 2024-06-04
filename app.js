const { PrismaClient } = require('@prisma/client');
const express = require('express');
const mehodOverride = require('method-override');
const path = require('path');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// set EJS template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk hashing password
prisma.$use(async (params, next) => {
  if (params.model === 'User') {
    if (params.action === 'create' || params.action === 'update') {
      if (params.args.data.password) {
        const hashedPassword = await bcrypt.hash(params.args.data.password, 10);
        params.args.data.password = hashedPassword;
      }
    }
  }
  return next(params);
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get('/roles', async (req, res) => {
  const roles = await prisma.role.findMany();
  res.json(roles);
});

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
