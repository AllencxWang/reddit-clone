const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000
const isProduction = process.env.NODE_ENV === 'production'

if (!isProduction) {
  // since webpack dev server runs in a different origin
  // we need to add this middleware to support cors
  app.use(cors())
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'static')))

app.get('/api/test', function(req, res) {
  res.json({hello: 'world'})
})

app.post('/api/test', function(req, res) {
  res.json(req.body)
})

app.listen(port, function() {
  console.log(`server is listening on port: ${port}`)
})

module.exports = app