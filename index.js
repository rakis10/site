var PORT =  process.env.PORT || 3000
var express = require('express')
var app = express()

var http =  require('http')

var server = http.Server(app)

express()
  .get('/', (req, res) => {
    res.send('Hello World!')
  })
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })