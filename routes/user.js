const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middlewares/auth');
const { admin } = require('../middlewares/admin');

// routes
router.get('/me', auth, userController.getCurrentUser);
router.post('/register', userController.register);
router.post('/auth', userController.auth);
router.post('/generateOTP', userController.generateOTP);
router.post('/loginViaOTP', userController.loginViaOTP);
router.post('/resendOTP', userController.resendOTP);

router.post('/generateSignUpOTP', userController.generateSignUpOTP);
router.post('/signUpViaOTP', userController.signUpViaOTP);

router.post('/forgotPass', userController.forgotPass);
router.post('/changePassword', userController.changePassword);

router.put('/:id', auth, userController.update);
router.get('/:id', userController.getById);
router.get('/', userController.getAll);

module.exports = router;
