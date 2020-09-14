var PORT =  process.env.PORT || 3000
var express = require('express')
var app = express()

var http =  require('http')

var server = http.Server(app)
app.use(express.static(__dirname));


express()
  .get('/', function(req, res)  {
    res.send('Hello World!')
  })
app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })