const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { auth } = require('../middlewares/auth');

// routes
router.get('/', auth, projectController.getAll);
router.post('/', auth, projectController.create);
router.get('/:id', auth, projectController.getById);
router.get('/getByUser/:id', auth, projectController.getByUserId);
router.put('/:id', auth, projectController.update);
router.delete('/:id', auth, projectController.deleteOne);

module.exports = router;
