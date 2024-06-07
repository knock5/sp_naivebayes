const { PrismaClient } = require('@prisma/client');
const ejsMate = require('ejs-mate');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ErrorHandler');
const bcrypt = require('bcrypt');
const path = require('path');
const hashedPassword = require('./middlewares/hashPassword');
const { ensureAuthenticated } = require('./middlewares/ensureAuthenticated');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// set EJS template engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(
  session({
    secret: process.env.SECRET_KEY || 'default-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Middleware untuk hashing password
prisma.$use(hashedPassword);

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.userId = user.user_id;
    req.session.roleId = user.roleId;
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

app.get('/registrasi', (req, res) => {
  res.render('registrasi');
});

app.post('/registrasi', async (req, res) => {
  const { nama, email, password } = req.body;

  // cek email
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).send('Email sudah terdaftar');
  }

  // create user
  const newUser = await prisma.user.create({
    data: {
      nama,
      email,
      password,
      roleId: 2,
    },
  });

  console.log(newUser);

  res.redirect('/login');
});

app.get('/dashboard', ensureAuthenticated, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { user_id: req.session.userId },
    include: { role: true },
  });
  res.render('dashboard', { user });
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/dashboard');
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

app.get('/users', ensureAuthenticated, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get('/roles', ensureAuthenticated, async (req, res) => {
  const roles = await prisma.role.findMany();
  res.json(roles);
});

// general route
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

// error message
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).render('error', { err });
});

const port = process.env.SERVER_PORT || 3030;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
