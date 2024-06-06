const { PrismaClient } = require('@prisma/client');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ErrorHandler');
const bcrypt = require('bcrypt');
const path = require('path');
const { ensureAuthenticated } = require('./middlewares/ensureAuthenticated');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// set EJS template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
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

app.get('/', ensureAuthenticated, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { user_id: req.session.userId },
    include: { role: true },
  });
  res.render('home', { user });
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
