const { PrismaClient } = require('@prisma/client');
const ejsMate = require('ejs-mate');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ErrorHandler');
const path = require('path');
const hashedPassword = require('./middlewares/hashPassword');
const router = require('./routes');

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

app.use(router);

// General route
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

// Error message
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).render('error', { err });
});

const port = process.env.SERVER_PORT || 3030;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
