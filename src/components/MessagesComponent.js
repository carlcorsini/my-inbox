import React, { Component } from 'react'
import MessageComponent from './MessageComponent'

class MessagesComponent extends Component {
  render() {
    const {
      messages,
      toggleStar,
      toggleSelect,
      showMessageBody,
      bodyDisplay
    } = this.props
    return (
      <div className="MessageComponent">
        {messages.map(message => (
          <MessageComponent
            key={message.id}
            message={message}
            toggleStar={toggleStar}
            toggleSelect={toggleSelect}
            showMessageBody={showMessageBody}
            // bodyDisplay={bodyDisplay}
          />
        ))}
      </div>
    )
  }
}

export default MessagesComponent
