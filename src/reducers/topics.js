import {FETCH_TOPICS, VOTE_UP, VOTE_DOWN} from '../constants'

export default (state = [], action) => {
  switch(action.type) {
    case FETCH_TOPICS:
      return action.payload
    case VOTE_UP:
      return state.map(topic => {
        if (topic.id === action.payload) {
          topic.vote += 1
        }
        return topic
      })
    case VOTE_DOWN:
      return state.map(topic => {
        if (topic.id === action.payload) {
          topic.vote -= 1
        }
        return topic
      })
    default:
      return state
  }
}