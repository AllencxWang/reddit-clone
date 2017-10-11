import * as actions from '../src/actions'
import * as constants from '../src/constants'

const expect = require('chai').expect

describe('Action Creators', () => {
  describe('testing [fetchTopics] function', () => {
    it('should be a function', () => {
      expect(actions.fetchTopics).to.be.a('function')
    })
    it('should return an action', () => {
      const topics = [{
        id: 0,
        content: 'hello',
        vote: 0
      }, {
        id: 0,
        content: 'world',
        vote: 0
      }]
      const action = actions.fetchTopics(topics)
      expect(action).to.have.property('type', constants.FETCH_TOPICS)
      expect(action).to.have.property('payload', topics)
    })
  })

  describe('testing [voteUp] function', () => {
    it('should be a function', () => {
      expect(actions.voteUp).to.be.a('function')
    })
  
    it('should return an action', () => {
      const action = actions.voteUp(0)
      expect(action).to.have.property('type', constants.VOTE_UP)
      expect(action).to.have.property('payload', 0)
    })
  })

  describe('testing [voteDown] function', () => {
    it('should be a function', () => {
      expect(actions.voteDown).to.be.a('function')
    })
  
    it('should return an action', () => {
      const action = actions.voteDown(1)
      expect(action).to.have.property('type', constants.VOTE_DOWN)
      expect(action).to.have.property('payload', 1)
    })
  })

  describe('testing [beginTransition] function', () => {
    it('should be a function', () => {
      expect(actions.beginTransition).to.be.a('function')
    })
  
    it('should return an action', () => {
      const action = actions.beginTransition()
      expect(action).to.have.property('type', constants.BEGIN_TRANSITION)
    })
  })

  describe('testing [endTransition] function', () => {
    it('should be a function', () => {
      expect(actions.endTransition).to.be.a('function')
    })
  
    it('should return an action', () => {
      const action = actions.endTransition()
      expect(action).to.have.property('type', constants.END_TRANSITION)
    })
  })
})