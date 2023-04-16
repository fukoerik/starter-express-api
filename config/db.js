const mysql = require('mysql')
const db = mysql.createConnection({
host: "130.61.59.174",
user: "sqluser",
password: "password",
database:"tasz100"
})

module.exports = db;