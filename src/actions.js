import * as constants from './constants'

export const voteUp = (id) => {
  return {
    type: constants.VOTE_UP,
    payload: id
  }
}

export const voteDown = (id) => {
  return {
    type: constants.VOTE_DOWN,
    payload: id
  }
}

export const beginTransition = () => {
  return {
    type: constants.BEGIN_TRANSITION,
  }
}

export const endTransition = () => {
  return {
    type: constants.END_TRANSITION,
  }
}

export const fetchTopics = (topics) => {
  return {
    type: constants.FETCH_TOPICS,
    payload: topics
  }
}