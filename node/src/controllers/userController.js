const repository = require('../repositories/SelecaoRepository')

exports.getAllUsers = async (req,res) => {
    try {
        const result = await repository.findAll();
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
} 

exports.createUser = async (req,res) => {
    try {
        const newUser = {
            name: req.body.name,
            password: req.body.password
        };
        const result = await repository.createUser(newUser)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.updateUser = async (req,res) => {
    try {
        const user =  {
            name: req.body.name,
            password: req.body.password
        }
        result = await repository.updateUser(req.params.id, user)
        res.status(200).json(result)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
};

exports.deleteUser = async (req,res) => {
    try {
        const user = await repository.deleteUser(req.params.id)
        res.status(200).json(user) 
    }catch (error) {
        res.status(400).json({message: error.message})
    }
};

exports.login = async (req,res) => {
    try {
        const user = await repository.findUser(req.body.user)
        if (user === null) {
            res.status(200).json({mensagem:'Usuario nao encontrado'})
        } else if (user.password != req.body.password) {
            res.status(200).json({mensagem:'Senha errada'})
        } else {
            res.status(200).json({mensagem:'Voce esta logado!'})
        }
    } catch(error) {
        res.status(400).json({message: error.message})
    }
};