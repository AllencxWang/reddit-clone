import React from 'react'
import PropTypes from 'prop-types'

const Editor = ({text, transition, onEdit, onSubmit}) => {
  return (
    <div className="editor">
      {transition ? (
        <div className="transition">waiting for server response...</div>
      ) : (
        <div>
          <textarea maxLength="255" autoFocus defaultValue={text}
          onChange={onEdit}></textarea>
          <button onClick={onSubmit} >Submit</button>  
        </div>
      )}
    </div>
  )
}

Editor.propTypes = {
  text: PropTypes.string,
  transition: PropTypes.bool,
  onEdit: PropTypes.func,
  onSubmit: PropTypes.func,
}

Editor.defaultProps = {
  transition: false
}

export default Editor