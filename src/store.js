import {createStore} from 'redux'

import reducers from './reducers'

const isProduction = process.env.NODE_ENV === 'production'
const window = isProduction ? {} : window || {}

const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store