const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/list', userController.getAllUsers);

//create

router.post('/', userController.createUser);

//update

router.put('/:id', userController.updateUser);

//delete

router.delete('/:id', userController.deleteUser);

module.exports = router;