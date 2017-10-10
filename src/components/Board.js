import React from 'react'
import PropTypes from 'prop-types'

import Topic from './Topic'

const Board = ({topics, transition, onVote}) => {
  return (
    <div className="board">
      {
        transition ? (
          <div className="transition">syncing with server...</div>
        ) : topics.map((topic, i) => (
            <Topic key={topic.id} {...topic} no={i+1} onVote={onVote} />
          )
        )
      }
    </div>
  )
}

Board.propTypes = {
  topics: PropTypes.array,
  transition: PropTypes.bool,
  onVote: PropTypes.func
}

Board.defaultProps = {
  topics: [],
  transition: false
}

export default Board