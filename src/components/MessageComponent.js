import React, { Component } from 'react'
// import classNames from 'classnames'

class MessageComponent extends Component {
  state = {
    bodyDisplay: false
  }
  showMessageBody = () => {
    this.setState({ bodyDisplay: !this.state.bodyDisplay })
  }
  render() {
    const { message, toggleStar, toggleSelect, showMessageBody } = this.props

    const readClass = message.read ? 'read' : 'unread'
    const starClass = message.starred ? 'fa-star' : 'fa-star-o'
    const selectedClass = message.selected ? 'selected' : ''

    const starMessage = e => {
      e.stopPropagation()
      toggleStar(message)
    }

    const labels = message.labels.map((label, i) => (
      <span key={i} className="label label-warning">
        {label}
      </span>
    ))

    return (
      <div>
        <div className={`row message ${readClass} ${selectedClass}`}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input
                  onClick={() => toggleSelect(message)}
                  type="checkbox"
                  checked={!!message.selected}
                  readOnly={true}
                />
              </div>
              <div className="col-xs-2">
                <i className={`star fa ${starClass}`} onClick={starMessage} />
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            {labels}
            <a onClick={() => this.showMessageBody()}>{message.subject}</a>
          </div>
        </div>
        <div
          style={{
            display: this.state.bodyDisplay ? 'block' : 'none'
          }}>
          <div className="row message-body">
            <div className="col-xs-11 col-xs-offset-1">{message.body}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default MessageComponent
