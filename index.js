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


    //Január    
app.get("/api/get/jan/bev", (req,res)=>{
    db.query("SELECT SUM(bevetel) FROM adatok WHERE honap = 'Január'", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });

app.get("/api/get/jan/kiad", (req,res)=>{
    db.query("SELECT SUM(kiadas) FROM adatok WHERE honap = 'Január'", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });

    //Február
app.get("/api/get/feb/bev", (req,res)=>{
    db.query("SELECT SUM(bevetel) FROM adatok WHERE honap = 'Február'", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });

app.get("/api/get/feb/kiad", (req,res)=>{
    db.query("SELECT SUM(kiadas) FROM adatok WHERE honap = 'Február'", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });

    //Március
    app.get("/api/get/mar/bev", (req,res)=>{
        db.query("SELECT SUM(bevetel) FROM adatok WHERE honap = 'Március'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });
    
    app.get("/api/get/mar/kiad", (req,res)=>{
        db.query("SELECT SUM(kiadas) FROM adatok WHERE honap = 'Március'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });

    //Április
    app.get("/api/get/apr/bev", (req,res)=>{
        db.query("SELECT SUM(bevetel) FROM adatok WHERE honap = 'Április'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });
    
    app.get("/api/get/apr/kiad", (req,res)=>{
        db.query("SELECT SUM(kiadas) FROM adatok WHERE honap = 'Április'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });

app.listen(process.env.PORT || 3000)