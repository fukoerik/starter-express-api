const mysql = require('mysql')
const db = mysql.createConnection({
host: "db4free.net",
user: "tasz100",
password: "o1LJ8fqVsLs8iByJ",
database:"tasz100" 
})

module.exports = db;