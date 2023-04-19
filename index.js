const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 3501;
app.use(cors());
app.use(express.json())

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const JWT_SECRET = 'mysecretkey@mysecretkey@mysecretkey@mysecretkey@mysecretkey@mysecretkey@';

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Lekérjük az adatbázisból a felhasználót
  const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: 'Hiba, nincs kapcsolat a szerverrel.'
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: 'Hibás felhasználónév vagy jelszó!'
      });
    }

    // Sikeres bejelentkezés, hozzunk létre egy JWT tokent
    const user = results[0];
    const newToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });

    // Frissítjük a felhasználó tokent az adatbázisban
    const updateTokenQuery = `UPDATE users SET token = '${newToken}' WHERE id = ${user.id}`;
    db.query(updateTokenQuery, (updateError, updateResults) => {
      if (updateError) {
        return res.status(500).json({
          message: 'Hiba történt az adatbázisban.'
        });
      }

      return res.status(200).json({
        message: `Sikeres bejelentkezés, üdv ${username}!`,
        token: newToken
      });
    });
  });
});

app.get("/user/get/:token", (req, res) => {
  const token = req.params.token.toString();
  db.query(
    `SELECT username FROM users WHERE token = '${token}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});


app.post('/validate', (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, 'jwt_secret_key');
    res.status(200).json({ message: 'A token  rv nyes.' });
  } catch (err) {
    res.status(401).json({ message: 'A token lej rt vagy hib s.' });
  }
});

  app.get("/api/get/calendar", (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: "A lekérdezéshez szükséged van egy tokenre!"
      });
    }
  
    try {
      const decodedToken = jwt.verify(token.slice(7), JWT_SECRET);
      // Ha a token valid, folytathatod a kérés végrehajtását
      db.query('SELECT * FROM cashflow',(err, result) => {
        if (err) {
          console.log(err);
        }
        res.send(result);
      });
    } catch (err) {
      return res.status(401).json({
        message: "Hibás token!"
      });
    }
  });

  app.post("/api/add", (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: "Az adatok hozzáadásához szükséges egy token!"
      });
    }
  
    try {
      const decodedToken = jwt.verify(token.slice(7), JWT_SECRET);
      // Ha a token valid, folytathatod az adatok hozzáadását
      const {id, bevetel, kiadas, nap, honap, ev} = req.body;
      db.query("INSERT INTO cashflow (id, bevetel, kiadas, nap, honap, ev) VALUES (?, ?, ?, ?, ?, ?)", [id, bevetel, kiadas, nap, honap, ev], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error adding data");
        } else {
          res.status(200).send("Data added successfully");
        }
      });
    } catch (err) {
      return res.status(401).json({
        message: "Hibás token!"
      });
    }
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

//app.listen(process.env.PORT || 3501)

app.listen(3501, () => {
  console.log('A szerver fut a 3501-es porton.');
});