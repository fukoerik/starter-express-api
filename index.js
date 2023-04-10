const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 80;
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


  app.get("/api/get/calendar", (req, res) => {
    db.query('SELECT * FROM cashflow',(err, result) => {
        if (err) {
          console.log(err);
        }
        res.send(result);
      }
    );
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

app.get("/api/get/:ev/:honap", (req,res)=>{
    const ev = req.params.ev;
    const honap = req.params.honap;
    db.query(`SELECT * FROM cashflow WHERE ev = ${ev} AND honap = ${honap} ORDER BY nap ASC`, (err, result) => {
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });

    app.get("/api/get/:ev", (req, res) => {
      const ev = req.params.ev;
      db.query(
        `SELECT honap, SUM(bevetel) AS bevetel, SUM(kiadas) AS kiadas FROM cashflow WHERE ev = ${ev} GROUP BY honap ORDER BY honap ASC`,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          res.send(result);
        }
      );
    });

app.listen(process.env.PORT || 80)