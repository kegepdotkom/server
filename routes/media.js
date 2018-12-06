var express = require('express');
var router = express.Router();
const mediaController = require('../controller/mediaController')
const multer = require('multer')
let upload = multer({dest: `image/`})

router.post('/', upload.single('image'), mediaController.store);
router.get('/', mediaController.read)
router.put('/:id', mediaController.update)
router.delete('/:id', mediaController.delete)
module.exports = router;
