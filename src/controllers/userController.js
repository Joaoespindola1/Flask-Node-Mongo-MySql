const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

//create user

exports.createUser = async (req,res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

//update user

exports.updateUser = async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, {
            new: true
        })
        res.status(200).json(user)
    } catch {
        res.status(400).json({message: error.message})
    }
};

//delete user

exports.deleteUser = async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(user) 
    }catch {
        res.status(400).json({message: error.message})
    }
};