const express = require('express');

const adminController = require('../controllers/signController');

const router = express.Router();

router.post('/sign/post',adminController.postData)




module.exports=router;