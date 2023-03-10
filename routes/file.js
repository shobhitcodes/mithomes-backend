const express = require('express');
const router = express.Router();
// const fileController = require('../controllers/fileController');
const { auth } = require('../middlewares/auth');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const File = require('../models/file');
const utils = require('../helpers/utils');

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
router.post('/uploadFile', auth, upload.any('fileUpload'), async (req, res) => {
    try {
        const files = [];

        if (req.files.length) {
            for (const file of req.files) {
                const file = await File.create({
                    name: file.filename,
                });
                files.push(file);
            }
        }

        res.json(utils.formatResponse(1, files));
    } catch (error) {
        res.json({
            error,
        });
    }
});

router.get('/getFiles', async (req, res) => {
    try {
        const files = await File.find();
        res.json(utils.formatResponse(1, files));
    } catch (error) {
        res.json({
            status: 'Fail',
            error,
        });
    }
});

module.exports = router;
