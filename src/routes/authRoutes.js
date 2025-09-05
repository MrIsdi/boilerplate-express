const express = require('express');
const AuthController = require('../controllers/authController');
const { body } = require('express-validator');
const validate = require('../middlewares/validation');

const router = express.Router();

router.post(
  '/register',
  [ 
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  validate,
  AuthController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  AuthController.login
);

module.exports = router;
