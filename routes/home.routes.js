const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const homeController = require('../controllers/home.controller');

const router = Router();

router.get('/', homeController.home);
router.get('/dashboard', ensureAuthenticated, homeController.dashView);
router.get('/users', ensureAuthenticated, homeController.getUsers);
router.get('/roles', ensureAuthenticated, homeController.getRoles);

module.exports = router;
