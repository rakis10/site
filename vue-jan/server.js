const express = require('express')
const app = express()
const { PORT, mongoUri } = require('./config')
const path = require('path')

app.get('*', (req, res) => {
   res.send("Suc")
    // res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))