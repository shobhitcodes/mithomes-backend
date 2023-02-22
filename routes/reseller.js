const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { admin } = require('../middlewares/admin');

const resellerController = require('../controllers/resellerController');

// routes
router.get('/getByUser/:id', auth, resellerController.getByUserId);
router.put('/:id', auth, resellerController.update);

module.exports = router;
