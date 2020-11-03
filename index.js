const express = require('express')

const app = express();

const { config } = require('./config/index')
const usersApi = require('./routes/users.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

usersApi(app)

app.listen(config.port,function(){
    console.log('Listening a la besto tiburoncita')
})