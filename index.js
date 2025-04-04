const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
const https = require('https')
const givingController = require('./controllers/giving')
const port = 3000
const cors = require('cors');


app.set('view engine', 'ejs')
app.use(session({
    secret: 'keybord cat',
    resave: false,
    saveUninitialized: true
}))

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())
  
app.post('/api/payment', givingController.giving)

// app.listen(port, () => {
//     console.log(`App listening on port ${port}`)
// })

module.exports = app;