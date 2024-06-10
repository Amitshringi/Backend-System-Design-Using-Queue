const express=require('express');
const queueController= require('../controllers/queueController');
const authController = require('../controllers/authController');
const router=express.Router();

router.use(authController.authenticate);
router.post('/request', queueController.enqueueRequest);

module.exports=router;