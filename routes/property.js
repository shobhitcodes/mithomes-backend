const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { auth } = require('../middlewares/auth');

// routes
router.get('/', auth, propertyController.getAll);
router.post('/', auth, propertyController.create);
router.get('/:id', auth, propertyController.getById);
router.get('/getByUser/:id', auth, propertyController.getByUserId);
router.get('/getByProject/:id', auth, propertyController.getByProjectId);
router.put('/:id', auth, propertyController.update);
router.delete('/:id', auth, propertyController.deleteOne);

module.exports = router;
