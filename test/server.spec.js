const request = require('supertest')
const expect = require('chai').expect

const server = require('../server')

describe('API Endpoints', () => {
  const initialTopicCount = 20
  it('should return initial topics', (done) => {
    request(server)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        const topics = res.body
        expect(topics.length).to.equal(initialTopicCount)
        done()
      })
      .catch(done)
  })

  it('should be able to add a new topic', (done) => {
    request(server)
      .post('/api/topics')
      .send({
        content: 'hello world'
      })
      .expect(200)
      .then((res) => {
        const topics = res.body
        expect(topics.length).to.equal(initialTopicCount+1)
        expect(topics[initialTopicCount]).to.deep.equal({
          id: initialTopicCount,
          content: 'hello world',
          vote: 0
        })
        done()
      })
      .catch(done)
  })

  it('should be able to modify the vote of mutiple topics', (done) => {
    request(server)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        return request(server)
          .put('/api/topics')
          .send({
            topics: [{
              id: initialTopicCount,
              delta: 1000
            }]
          })    
      })
      .then((res) => {
        const topics = res.body
        expect(res.statusCode).to.equal(200)
        expect(topics[0]).to.deep.equal({
          id: initialTopicCount,
          content: 'hello world',
          vote: 1000
        })
        done()
      })
      .catch(done)
  })

  it('should be able to modify the vote of a topic', (done) => {
    request(server)
      .put(`/api/topics/${initialTopicCount}`)
      .send({
        delta: -2000
      })
      .expect(200)
      .then((res) => {
        const topics = res.body
        expect(topics[initialTopicCount]).to.deep.equal({
          id: initialTopicCount,
          content: 'hello world',
          vote: -1000
        })
        done()
      })
      .catch(done)
  })

  it('shoud return 404 for everything else', (done) => {
    request(server)
      .get('/not/found')
      .expect(404)
      .then((res) => {
        return request(server).post('/foo/bar')    
      })
      .then((res) => {
        expect(res.statusCode).to.equal(404)
        return request(server).put('/bar/baz')
      })
      .then((res) => {
        expect(res.statusCode).to.equal(404)
        return request(server).delete('/baz/foo')
      })
      .then((res) => {
        expect(res.statusCode).to.equal(404)
        done()
      })
      .catch(done)
  })
})