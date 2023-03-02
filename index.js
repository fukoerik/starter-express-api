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

    //Május
    app.get("/api/get/maj/bev", (req,res)=>{
        db.query("SELECT SUM(bevetel) FROM adatok WHERE honap = 'Május'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });
    
    app.get("/api/get/maj/kiad", (req,res)=>{
        db.query("SELECT SUM(kiadas) FROM adatok WHERE honap = 'Május'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });

    //Június
    app.get("/api/get/jun/bev", (req,res)=>{
        db.query("SELECT SUM(bevetel) FROM adatok WHERE honap = 'Június'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });
    
    app.get("/api/get/jun/kiad", (req,res)=>{
        db.query("SELECT SUM(kiadas) FROM adatok WHERE honap = 'Június'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });

    //Július
    app.get("/api/get/jul/bev", (req,res)=>{
        db.query("SELECT SUM(bevetel) FROM adatok WHERE honap = 'Július'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });
    
    app.get("/api/get/jul/kiad", (req,res)=>{
        db.query("SELECT SUM(kiadas) FROM adatok WHERE honap = 'Július'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });

    //Augusztus
    app.get("/api/get/aug/bev", (req,res)=>{
        db.query("SELECT SUM(bevetel) FROM adatok WHERE honap = 'Augusztus'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });
    
    app.get("/api/get/aug/kiad", (req,res)=>{
        db.query("SELECT SUM(kiadas) FROM adatok WHERE honap = 'Augusztus'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });

    //Szeptember
    app.get("/api/get/szep/bev", (req,res)=>{
        db.query("SELECT SUM(bevetel) FROM adatok WHERE honap = 'Szeptember'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });
    
    app.get("/api/get/szep/kiad", (req,res)=>{
        db.query("SELECT SUM(kiadas) FROM adatok WHERE honap = 'Szeptember'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });

    //Október
    app.get("/api/get/okt/bev", (req,res)=>{
        db.query("SELECT SUM(bevetel) FROM adatok WHERE honap = 'Október'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });
    
    app.get("/api/get/okt/kiad", (req,res)=>{
        db.query("SELECT SUM(kiadas) FROM adatok WHERE honap = 'Október'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });

    //November
    app.get("/api/get/nov/bev", (req,res)=>{
        db.query("SELECT SUM(bevetel) FROM adatok WHERE honap = 'November'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });
    
    app.get("/api/get/nov/kiad", (req,res)=>{
        db.query("SELECT SUM(kiadas) FROM adatok WHERE honap = 'November'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });

    //December
    app.get("/api/get/dec/bev", (req,res)=>{
        db.query("SELECT SUM(bevetel) FROM adatok WHERE honap = 'December'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });
    
    app.get("/api/get/dec/kiad", (req,res)=>{
        db.query("SELECT SUM(kiadas) FROM adatok WHERE honap = 'December'", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });

app.listen(process.env.PORT || 3000)