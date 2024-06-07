const { Router } = require('express');
const authRouter = require('./auth.routes');
const homeRouter = require('./home.routes');

const router = Router();

router.use('/', authRouter);
router.use('/', homeRouter);

module.exports = router;
