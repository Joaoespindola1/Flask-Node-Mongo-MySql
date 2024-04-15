const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

const PORT = 3000;

mongoose.connect('mongodb+srv://scraftkg:21141034@node.ncn82ue.mongodb.net/?retryWrites=true&w=majority&appName=Node').then(() => {
    console.log('Deu bom');
}).catch((err) => {
    console.log("Deu ruim. Erro:" + err)
})

const User = require('./models/User')

app.get('/', (req, res) => {
    res.send('Hello Woooooorld');
});

//Deletando usuarios

app.delete('/:id', async (req,res) => {
    const user = await User.findByIdAndDelete(req.params.id)
     return res.send(user) 
})

//Atualizando usuarios

app.put('/:id', async (req,res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, {
        new: true
    })
    res.send(user)
})

//Listando usuarios

app.get('/list', async (req, res) => {
    const users = await User.find()
    res.send(users);
});

//Cadastrando novo usuario

app.post('/', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    
    await newUser.save()
    res.send(newUser)
});


app.get('/users/:userId/books/:bookId', (req, res) => {
    console.log(req.params);
    const { userId, bookId } = req.params
    console.log(userId);
    console.log(bookId);
    res.send(req.params);
});

app.listen(PORT, () => {
    console.log(`O servidor está funcionando na porta: ${PORT}`);
});