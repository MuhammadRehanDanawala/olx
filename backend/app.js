const express = require('express')
const adsRoutes = require('./modules/ads/ads-routes')
const userRoutes = require('./modules/users/user-routes')
const session = require('express-session')
const cors = require('cors')
const bodyParser = require('body-parser')
const dbHelper = require('./dbHelpers/dbHelper')
const multer = require('multer')
const app = express()
const port = 4000;
const upload = multer({})


app.use(session({ secret: 'hello world, this is a secret key..!', resave: false, saveUninitialized: true, cookie: { secure: false } }))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/ads', upload.single('headerImage') ,adsRoutes)
app.use('/users', userRoutes)



app.listen(port, (err) => {
    if (err) {
        console.log("Error in listening ", port);
        console.log(err)
        return;
    }
    console.log("Server is started ", port)
    dbHelper.connectWithDB()
})