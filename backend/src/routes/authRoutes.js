const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const { validateRegistration, validateLogin, checkValidation } = require('../middleware/validate');

router.post('/register', validateRegistration, checkValidation, authController.register);
router.post('/login', validateLogin, checkValidation, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.getUser);
router.put('/profile', authMiddleware, authController.updateProfile);
router.delete('/me', authMiddleware, authController.deleteAccount);

module.exports = router;
