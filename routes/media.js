var express = require('express');
var router = express.Router();
const mediaController = require('../controller/mediaController')
const multer = require('multer')
const googleStorage = require('../middlewares/google-storage')
const storage = multer.memoryStorage()
let upload = multer({storage: storage})

router.post('/', upload.single('image'), googleStorage.googleStorage, mediaController.store);
router.get('/', mediaController.read)
router.put('/:id', mediaController.update)
router.delete('/:id', mediaController.delete)

module.exports = router;
