import {createStore, combineReducers} from 'redux'

import topics from './reducers/topics'
import transition from './reducers/transition'

const store = createStore(
	combineReducers({topics, transition}),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store