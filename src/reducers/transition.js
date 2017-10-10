import {BEGIN_TRANSITION, END_TRANSITION} from '../constants'

export default (state = false, action) => {
  switch(action.type) {
    case BEGIN_TRANSITION:
      return true
    case END_TRANSITION:
      return false
    default:
      return state
  }
}