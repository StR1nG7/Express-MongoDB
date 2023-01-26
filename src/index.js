const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserControllers = require('./controllers');

const db = 'mongodb+srv://StR1nG7:123654@cluster0.f8cgzaz.mongodb.net/server?retryWrites=true&w=majority';

mongoose
    .set('strictQuery', true)
    .connect(db)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

const app = express();

app.use(bodyParser.json());

app.get('/users', (req, res) => {
    UserControllers.getUsers()
        .then(users => {
            res
                .status(200)
                .send(users);
        })
        .catch(err => {
            console.log(err);
            res.send(err); 
        });
});

app.post('/users', (req, res) => {
    UserControllers.saveUser(req.body)
        .then(user => {
            res
                .status(201)
                .send(user);
        })
        .catch(err => {
            console.log(err);
            res.send(err); 
        });
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    UserControllers.deleteUser(id)
        .then(user => {
            res
                .status(201)
                .send(user);
        })
        .catch(err => {
            console.log(err);
            res.send(err); 
        });
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    UserControllers.updateUser(id, req.body)
        .then(user => {
            res
                .status(201)
                .send(user);
        })
        .catch(err => {
            console.log(err);
            res.send(err); 
        });
});

app.listen(8000, () => console.log('Server listening on port 8000'));