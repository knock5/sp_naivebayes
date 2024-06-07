const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');

const router = Router();

router.get('/login', AuthController.loginView);
router.post('/login', AuthController.login);
router.get('/registrasi', AuthController.regisView);
router.post('/registrasi', AuthController.register);
router.get('/logout', AuthController.logout);

module.exports = router;
