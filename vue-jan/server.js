const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const bucketListItemRoutes = require('./routes/api/bucketListItems')
const users = require("./routes/api/users")
const zasoby= require("./routes/api/zasoby")
const path = require('path')
const passport = require('passport')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())


// Use the passport Middleware
app.use(passport.initialize());
// Bring in the Passport Strategy
require('./config/passport')(passport);

mongoose
    .connect(mongoUri, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))


app.use('/api/bucketListItems', bucketListItemRoutes)
app.use('/api/users',users)
app.use('/api/zasoby',zasoby)

// developing
if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/dist'))
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
   })
}

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'clienpublic/index.html'));
// })
// app.get('*', (req, res) => {
//    // res.send("Suc")
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
// })

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))