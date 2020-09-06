const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
let userData = require('./user-data.json');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan.apply('combined'));

// Get All
app.get('/users', (req, res) => {
    res.send(userData);
});

// Get One
app.get('/users/:usersId', (req, res) => {
    const result = userData.find(user => user.id === Number(req.params.usersId));
    // console.log(result)
    if(result) {
        res.status(200).send(result);
    } else {
        res.status(400).send('User not found.');
    }
});

// Add One
app.post('/users/', (req, res) => {
    // console.log(req.body);
    let user = req.body;
    let ids = userData.map(user => user.id).sort((a,b) => a - b);
    user.id = ++ids[ids.length -1];
    userData.push(user);
    // console.log(user);
    res.status(200).send(`Added new user { name: '${user.name}', id: ${user.id}}`);
});


// Update One
app.put('/users/:usersId', (req, res) => {
    let userId = Number(req.params.usersId)
    let userUpdated = req.body;
    let userDataCopy = userData;

    userDataCopy.forEach((user, idx) => {
        if (user.id === userId) {
            userData[idx] = userUpdated;
            console.log(userData[idx])
        }
    });

    res.status(200).send(userData);
});

// Update One item in the payload
app.patch('/users/:usersId', (req, res) => {
    let userId = Number(req.params.usersId)
    let userUpdated = req.body;
    let userDataCopy = userData;
    //TODO: finish this one
    userDataCopy.forEach((user, idx) => {
        if (user.id === userId) {
            let keys = Object.keys(userDataCopy);
            userData[idx] = userUpdated;
            console.log(keys);
        }
    });

    res.status(200).send(userData);
});


// Delete one
app.delete('/users/:usersId', (req, res) => {
    let userId = Number(req.params.usersId)
    let userDataCopy = userData;

    userDataCopy.forEach((user, idx) => {
        if (user.id === userId) {
            let junk = userData.splice(idx, 1);
            console.log(junk);
        }
    });

    res.status(200).send(userData);
});



app.listen('3002', () => {
    console.log('Listening on port 3002');
});