const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('mit-homes in action');
});

module.exports = router;
