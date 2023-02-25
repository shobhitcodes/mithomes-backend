const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { auth } = require('../middlewares/auth');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const path = require('path');
const File = require('../models/file');

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: multerStorage,
});

// routes
// router.get('/', auth, propertyController.getAll);
// router.post('/', auth, propertyController.create);
// router.get('/:id', auth, propertyController.getById);
// router.get('/getByUser/:id', auth, propertyController.getByUserId);
// router.get('/getByProject/:id', auth, propertyController.getByProjectId);
// router.put('/:id', auth, propertyController.update);
// router.delete('/:id', auth, propertyController.deleteOne);

//API Endpoint for uploading file
router.post(
    '/uploadFile',
    auth,
    upload.single('fileUpload'),
    async (req, res) => {
        // Stuff to be added later
        console.log(req.file);
        try {
            const newFile = await File.create({
                name: req.file.filename,
            });
            res.status(200).json({
                status: 'success',
                message: 'File created successfully!!',
            });
        } catch (error) {
            res.json({
                error,
            });
        }
    }
);

router.get('/api/getFiles', async (req, res) => {
    try {
        const files = await File.find();
        res.status(200).json({
            status: 'success',
            files,
        });
    } catch (error) {
        res.json({
            status: 'Fail',
            error,
        });
    }
});

module.exports = router;
