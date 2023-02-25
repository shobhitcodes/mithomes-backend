const express = require('express');
const router = express.Router();
const builderController = require('../controllers/builderController');
const { auth } = require('../middlewares/auth');
const { admin } = require('../middlewares/admin');

// routes
router.get('/', auth, admin, builderController.getAll);
router.get('/:id', auth, admin, builderController.getById);
router.post('/', auth, admin, builderController.create);
router.put('/:id', auth, admin, builderController.update);
router.delete('/:id', auth, admin, builderController.deleteOne);
router.get('/getByUser/:id', auth, admin, builderController.getByUserId);

module.exports = router;
