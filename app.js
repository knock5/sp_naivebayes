const { PrismaClient } = require('@prisma/client');
const ejsMate = require('ejs-mate');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ErrorHandler');
const bcrypt = require('bcrypt');
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

// data seeder
async function seed() {
  try {
    // Create roles if they don't exist
    await prisma.role.createMany({
      data: [
        { role_id: 1, nama: 'admin' },
        { role_id: 2, nama: 'bendahara' },
      ],
      skipDuplicates: true, // Skip creating if they already exist
    });

    // Create users if they don't exist
    await prisma.user.createMany({
      data: [
        {
          nama: 'Selvi',
          email: 'selvi@gmail.com',
          password: await bcrypt.hash('selvi123', 10),
          roleId: 1,
        },
        {
          nama: 'Silvi',
          email: 'silvi@gmail.com',
          password: await bcrypt.hash('silvi123', 10),
          roleId: 2,
        },
      ],
      skipDuplicates: true,
    });
  } catch (e) {
    console.error('Error seeding the database:', e);
  }
}
