const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
//Vocês implementam os novos métodos atrelados a rota
//create
//update
//delete

module.exports = router;