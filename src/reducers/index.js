import {combineReducers} from 'redux'

import topics from './topics'
import transition from './transition'

const reducers = combineReducers({topics, transition})

export default reducers