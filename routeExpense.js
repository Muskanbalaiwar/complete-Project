const express = require('express');

const adminController = require('../controllers/expenseController');

const router = express.Router();

router.post('/user/post',adminController.postData)

router.get('/user/getData',adminController.getAll);
router.delete('/user/deleteData/:id',adminController.delete);
router.put('/user/getData/:id',adminController.getData)

module.exports=router;