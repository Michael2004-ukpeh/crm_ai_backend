const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const express = require('express');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);
router.get('/', authController.protect, userController.getAllUsers);

router.get('/:id', authController.protect, userController.getUser);

module.exports = router;
