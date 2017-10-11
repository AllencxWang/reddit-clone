import React, {Component} from 'react'
import PropTypes from 'prop-types'

const Topic = ({id, vote, content, no, onVote}) => {
  const onClick = (evt) => {
    var up = evt.target.classList.contains('arrow-up') 
    onVote({
      id,
      value: up ? 1 : -1
    })
  }
  return (
    <div className="topic">
      <div className="score">
        <div className="arrow-up" onClick={onClick}></div>
        <div className="vote">{vote}</div>
        <div className="arrow-down"onClick={onClick}></div>
      </div>
      <div className="content">{content}</div>
      <div className="no">{no}</div>
      <div className="clear"></div>
    </div>
  )
}

Topic.propTypes = {
  id: PropTypes.number.isRequired,
  vote: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  no: PropTypes.number.isRequired,
  onVote: PropTypes.func
}

export default Topic