const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { admin } = require('../middlewares/admin');

const userController = require('../controllers/userController');

// routes
router.post('/register', userController.register);
router.post('/auth', userController.auth); // login
router.get('/me', auth, userController.getCurrentUser);

// otp based
// router.post('/registerOTP', userController.registerOTP);
// router.post('/authOTP', userController.authOTP); // login
// router.post('/generateOTP', userController.generateOTP);
// router.post('/resendOTP', userController.resendOTP);
// router.post('/forgotPass', userController.forgotPass);
// router.post('/changePassword', userController.changePassword);

router.put('/:id', auth, userController.update);
router.get('/:id', auth, admin, userController.getById);
router.get('/', auth, admin, userController.getAll);

module.exports = router;
