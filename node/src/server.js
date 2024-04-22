const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

const Router = require('./routes/userRoutes')
app.use(Router)
const PORT = 3000;

mongoose.connect('mongodb+srv://scraftkg:21141034@node.ncn82ue.mongodb.net/?retryWrites=true&w=majority&appName=Node').then(() => {
    console.log('Conectado ao banco');
}).catch((err) => {
    console.log("Deu ruim. Erro:" + err)
})

const User = require('./models/User')

app.get('/', (req, res) => {
    res.send('Hello Woooooorld');
});

app.listen(PORT, () => {
    console.log(`O servidor está funcionando na porta: ${PORT}`);
});