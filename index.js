const express = require('express')
const app = express()
app.all('/asd', (req, res) => {
    console.log("Just got a request!")
    res.send('Új szöveg!')
})
app.listen(process.env.PORT || 3000)