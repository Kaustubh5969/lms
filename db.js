const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/ZP_Valmikwadi';

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log("Connected to Database");
})
db.on('disconnected', ()=>{
    console.log("Database Disconnected");
})
db.on('error', ()=>{
    console.log("Error to Database Connection");
})

module.exoprts = db;