import * as constants from './constants'

export const vote = (data) => {
  return {
    type: data.type,
    payload: data.id
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