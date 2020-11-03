const express = require('express')
// const cors = require('cors');

// var multer  = require('multer')

// var upload = multer({ dest: 'uploads/' })
// let multer = require('multer');
// let upload = multer();

const app = express();

const { config } = require('./config/index')
const usersApi = require('./routes/users.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

usersApi(app)

// app.use(cors());

app.listen(config.port,function(){
    console.log('Listening a la besto tiburoncita')
})