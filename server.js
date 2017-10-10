const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sort = require('./lib/utils').sort

const app = express()
const isProduction = process.env.NODE_ENV === 'production'

const compare = (a, b) => {
  // sort by vote number (desc)
  // if two topics have same vote number, then sort by id (asc)
  // this will keep the last-created topic at the bottom
  // since its vote number will be 0 and it will have the biggest id
  if (a.vote > b.vote) return -1
  else if (a.vote < b.vote) return 1
  else return a.id - b.id
}

const topics = Array(20).fill(0).map((item, index) => ({
  id: index,
  content: `topic ${index+1}`,
  vote: Math.floor(Math.random()*100)
}))

let sortedTopics = sort(topics, compare)

// use wrap to simulate network latency in dev environment (localhost)
const wrap = isProduction ? (fn) => fn : (fn) => () => setTimeout(fn, 500)

if (!isProduction) {
  // since webpack dev server runs in a different origin
  // we need to add this middleware to support cors
  app.use(cors())
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'static')))

app.get('/api/topics', (req, res) => {
  wrap(() => res.json(sortedTopics))()
})

app.post('/api/topics', (req, res) => {
  const newTopic = {
    id: topics.length,
    content: `${req.body.content}`, // caution: potential xss
    vote: 0
  }
  topics.push(newTopic)
  sortedTopics.push(newTopic)
  wrap(() => res.json(sortedTopics))()
})

app.put('/api/topics', (req, res) => {
  let changed = false
  for (let t of req.body.topics) {
    const topic = topics[t.id]
    if (topic) {
      topic.vote += t.delta
      changed = true
    }
  }

  if (!changed) return res.status(204).end()

  sortedTopics = sort(topics, compare)
  wrap(() => res.json(sortedTopics))()
})

app.put('/api/topics/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const delta = parseInt(req.body.delta, 10)
  if (isNaN(id) || isNaN(delta) || id > topics.length || id < 0 || delta === 0) {
    // if the id or the vote number is invalid 
    // or the vote number doesn't change
    // then there is no need to refresh the page
    return res.status(204).end()
  }
  topics[id].vote += delta
  sortedTopics = sort(topics, compare)
  wrap(() => res.json(sortedTopics))()
})

module.exports = app