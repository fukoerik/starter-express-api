const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 3000;
app.use(cors());
app.use(express.json())


app.get("/api/get", (req,res)=>{
    db.query("SELECT * FROM adatok", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });


app.listen(process.env.PORT || 3000)