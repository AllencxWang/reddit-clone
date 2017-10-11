import React, {Component} from 'react'
import {BrowserRouter, Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import debounce from 'lodash.debounce'
import axios from 'axios'

import {voteUp, voteDown, fetchTopics, beginTransition, endTransition} from '../actions'
import {SERVER} from '../constants'
import '../style.scss'

import Editor from './Editor'
import Board from './Board'

class App extends Component {
  constructor(props) {
    super(props)
    this.vote = this.vote.bind(this)
    this.edit = this.edit.bind(this)
    this.submit = this.submit.bind(this)
    this.syncVote = debounce(this.syncVote, 1000)
    this.storeText = debounce(this.storeText, 250)
    this.queue = {}
  }
  startTrans() {
    this.props.dispatch(beginTransition())
  }
  stopTrans(data) {
    this.props.dispatch(endTransition())
    if (data) this.props.dispatch(fetchTopics(data))
  }

  vote(data) {
    if (data.value > 0) this.props.dispatch(voteUp(data.id))
    else this.props.dispatch(voteDown(data.id)) 
    this.queue[data.id] = this.queue[data.id] || 0
    this.queue[data.id] += data.value
    this.syncVote()
  }
  syncVote() {
    this.startTrans()
    axios
      .put(`${SERVER}/api/topics`, {
        topics: Object.entries(this.queue).map(entry => {
          const [id, delta] = entry
          return {id, delta}
          // no need to update if the vote number stays the same
        }).filter(topic => topic.delta !== 0) 
      })
      .then((res) => {
        this.queue = {}
        this.stopTrans(res.data)
      })
      .catch((err) => {
        console.error(err)
        this.stopTrans()
      })
  }
  edit(evt) {
    this.storeText(evt.target.value)
  }
  storeText(text) {
    localStorage.setItem('text', text)
  }
  submit(evt) {
    const content = localStorage.getItem('text')
    if (!content) return

    this.startTrans()  
    axios
      .post(`${SERVER}/api/topics`, {
        content
      })
      .then((res) => {
        localStorage.removeItem('text')
        this.stopTrans(res.data)
      })
      .catch((err) => {
        console.error(err)
        this.stopTrans()
      })  
  }
  componentDidMount() {
    this.startTrans()
    axios
      .get(`${SERVER}/api/topics`)
      .then((res) => {
        this.stopTrans(res.data)
      })
      .catch((err) => {
        console.error(err)
        this.stopTrans()
      })
  }
  render() {
    return (  
      <BrowserRouter>
        <div className="app">
          <header>
            <nav>
              <NavLink exact to="/" activeClassName="active">Board</NavLink>
              <NavLink to="/new" activeClassName="active">New Topic</NavLink>
            </nav>
          </header>
          <Route exact path="/" render={(props) => (
            <Board 
              topics={this.props.topics} onVote={this.vote}
              transition={this.props.transition} />
          )} />
          <Route path="/new" render={(props) => (
            <Editor 
              text={localStorage.getItem('text') || ''}
              transition={this.props.transition}
              onEdit={this.edit} onSubmit={this.submit} />
          )} />
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(App)