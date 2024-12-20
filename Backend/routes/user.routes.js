const express = require('express');
const router = express.Router();
const {body}=require('express-validator');
const userController = require('../controllers/user.controllers');



router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname').isLength({min:3}).withMessage('Full name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
],userController.register);








module.exports = router;