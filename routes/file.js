const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { auth } = require('../middlewares/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');

// routes
// router.get('/', auth, propertyController.getAll);
// router.post('/', auth, propertyController.create);
// router.get('/:id', auth, propertyController.getById);
// router.get('/getByUser/:id', auth, propertyController.getByUserId);
// router.get('/getByProject/:id', auth, propertyController.getByProjectId);
// router.put('/:id', auth, propertyController.update);
// router.delete('/:id', auth, propertyController.deleteOne);

//API Endpoint for uploading file
router.post('/api/uploadFile', auth, upload.single('myFile'), (req, res) => {
    // Stuff to be added later
    console.log(req.file);
});

module.exports = router;
