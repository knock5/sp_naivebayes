const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const homeController = require('../controllers/home.controller');

const router = Router();

router.get('/', ensureAuthenticated, homeController.dashView);
router.get('/dashboard', ensureAuthenticated, homeController.dashView);
router.get('/users', ensureAuthenticated, homeController.getUsers);
router.get('/create-user', ensureAuthenticated, homeController.createUserView);
router.get('/roles', ensureAuthenticated, homeController.getRoles);
router.post('/users/delete/:id', homeController.deleteUser);
router.get('/custs', ensureAuthenticated, homeController.getCusts);
router.get('/csview', ensureAuthenticated, homeController.getCustsRead);
router.get('/create-cust', ensureAuthenticated, homeController.createCustView);
router.post('/cscreate', ensureAuthenticated, homeController.createCust);
router.get('/cust/edit/:id', ensureAuthenticated, homeController.editCustView);
router.post('/cust/edit/:id', ensureAuthenticated, homeController.updateCust);
router.post('/cust/delete/:id', ensureAuthenticated, homeController.deleteCust);
router.get('/prediksi', ensureAuthenticated, homeController.getPrediksiView);

module.exports = router;
