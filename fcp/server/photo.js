const express = require("express");
const router = express.Router();
const multer = require('multer');

const upload = multer({
    dest: '../public/images/',
    limits: {
        fileSize: 10000000
    }
})

router.post('/', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

module.exports = router;