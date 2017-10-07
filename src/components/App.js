import React from 'react'
import axios from 'axios'

import config from '../config'

const App = () => (
  <div>
    <button onClick={(evt) => {
      axios.post(`${config.server}/api/test`, {
        hello: 'world',
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    }}>test</button>
  </div>
)

export default App