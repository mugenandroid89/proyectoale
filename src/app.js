const express = require('express');
const morgan = require('morgan');
const database = require("./database/database") 
const fileUpload = require('express-fileUpload');

const port=3000;

const app=express();

app.set('port',port);

app.use(express.json());

app.use(morgan("dev"));

app.use('/api/accounts',require('../src/routes/acounts.routes'));
// app.use('/api/users',require('./routes/users.routes'));
app.use('/api/login', require('../src/routes/auth.routes'));

app.use('/api/transactions', require('../src/routes/transactions.routes'));

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath:true
}));
app.use('/api/uploads',require('../src/routes/uploads.routes'));

//prueba de conexión satifactoria
database.getConnection().then(conexion=>{console.log(conexion)})
module.exports = app;