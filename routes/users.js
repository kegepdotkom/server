var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')

router.post('/', userController.register)
router.post('/login', userController.login)
router.put('/:id', userController.edit)

module.exports = router;
