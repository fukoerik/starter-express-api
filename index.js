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

const users = [
  {
    id: 1,
    username: 'user1',
    password: 'password1'
  },
  {
    id: 2,
    username: 'user2',
    password: 'password2'
  }
];

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Ellenőrizzük, hogy a felhasználónév és jelszó helyesek-e
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({
      message: 'Invalid username or password'
    });
  }

  // Ha a felhasználónév és jelszó helyesek, hozzunk létre egy JWT tokent és küldjük vissza a válaszban
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '10h' });

  res.status(200).json({
    message: 'Login successful',
    token
  });
});


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
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: "Authorization token is required"
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
        message: "Invalid authorization token"
      });
    }
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

//app.listen(process.env.PORT || 3501)

app.listen(3501, () => {
  console.log('A szerver fut a 3501-es porton.');
});