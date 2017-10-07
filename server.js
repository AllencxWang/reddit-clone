const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'static')))

app.get('/api/test', function(req, res) {
  res.json({hello: 'world'})
})

app.listen(port, function() {
  console.log(`server is listening on port: ${port}`)
})

module.exports = app