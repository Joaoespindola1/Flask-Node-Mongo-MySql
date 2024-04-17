const User = require('../models/User');

exports.find = () => {
    return User.find();
};

exports.createUser = (userData) => {
    const newUser = User(userData);
    return newUser.save();
};

exports.updateUser = (id,userData) => {
    return User.findByIdAndUpdate(id, userData, {
        new: true
    })
};

exports.deleteUser = (id) => {
    return User.findByIdAndDelete(id)
};