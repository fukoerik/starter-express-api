const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 3000;
app.use(cors());
app.use(express.json())


app.get('/api/checkdb', (req, res) => {
    db.connect((err) => {
      if (err) {
        console.error('Error connecting to database: ' + err.stack);
        res.status(500).send('Error connecting to database');
      } else {
        console.log('Connected to database as id ' + db.threadId);
        res.send('Database connection successful');
      }
    });
  });

  app.post("/api/add", (req, res) => {
    const {id, bevetel, kiadas, nap, honap, ev} = req.body;
    db.query("INSERT INTO cashflow (id, bevetel, kiadas, nap, honap, ev) VALUES (?, ?, ?, ?, ?, ?)", [id, bevetel, kiadas, nap, honap, ev], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error adding data");
      } else {
        res.status(200).send("Data added successfully");
      }
    });
  });

app.get("/api/get", (req,res)=>{
    db.query("SELECT * FROM cashflow", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });

app.listen(process.env.PORT || 3000)