const express = require('express');

const adminController = require('../controllers/signController');

const router = express.Router();

router.post('/sign/post',adminController.postData)
router.post('/login/post',adminController.login)



module.exports=router;