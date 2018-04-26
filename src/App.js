import React, { Component } from 'react'
import ToolbarComponent from './components/ToolbarComponent'
import MessagesComponent from './components/MessagesComponent'
import ComposeComponent from './components/ComposeComponent'
import MessageComponent from './components/MessageComponent'

class App extends Component {
  state = {
    messages: [],
    display: false,
    subject: '',
    body: ''
  }

  componentDidMount = async () => {
    const messages = await fetch('http://localhost:8082/api/messages')
    const JSONmessages = await messages.json()
    this.setState({ messages: [...JSONmessages] })
  }

  toggleProperty(message, property) {
    const index = this.state.messages.indexOf(message)
    this.setState({
      messages: [
        ...this.state.messages.slice(0, index),
        {
          ...message,
          [property]: !message[property]
        },
        ...this.state.messages.slice(index + 1)
      ]
    })
  }

  toggleStar = message => {
    this.toggleProperty(message, 'starred')
  }

  toggleSelect = message => {
    this.toggleProperty(message, 'selected')
  }

  markReadStatus = boolean => {
    this.setState({
      messages: this.state.messages.map(
        message => (message.selected ? { ...message, read: boolean } : message)
      )
    })
  }

  // deleteMessages = () => {
  //   const messages = this.state.messages.filter(messages => !messages.selected)
  //   this.setState({ messages })
  // }

  applyLabel = label => {
    const messages = this.state.messages.map(
      message =>
        message.selected && !message.labels.includes(label)
          ? { ...message, labels: [...message.labels, label].sort() }
          : message
    )
    this.setState({ messages })
  }

  removeLabel = label => {
    const messages = this.state.messages.map(message => {
      const index = message.labels.indexOf(label)
      if (message.selected && index > -1)
        return {
          ...message,
          labels: [
            ...message.labels.slice(0, index),
            message.labels.slice(index + 1)
          ]
        }
      return message
    })
    this.setState({ messages })
  }

  toggleSelectAll = () => {
    const selectedMessages = this.state.messages.filter(
      message => message.selected
    )
    const selected = selectedMessages.length !== this.state.messages.length
    this.setState({
      messages: this.state.messages.map(
        message =>
          message.selected !== selected ? { ...message, selected } : message
      )
    })
  }

  showComposeMessage = () => {
    this.setState({ display: !this.state.display })
  }

  deleteMessages = async () => {
    const selectedMessages = this.state.messages.filter(
      message => message.selected
    )
    const messageIds = selectedMessages.map(message => {
      return message.id
    })

    const command = 'delete'
    const result = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        messageIds,
        command
      })
    })
    const message = await result.json()
    console.log('RESULT', message)
  }

  sendMessage = async (content, read = false, starred = false, labels = []) => {
    const result = await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(content),
      read,
      starred,
      labels,
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    const message = await result.json()
    console.log('RESULT', message)
  }

  render() {
    return (
      <div className="App">
        <ToolbarComponent
          messages={this.state.messages}
          toggleSelectAll={this.toggleSelectAll}
          markReadStatus={this.markReadStatus}
          deleteMessages={this.deleteMessages}
          applyLabel={this.applyLabel}
          removeLabel={this.removeLabel}
          showComposeMessage={this.showComposeMessage}
        />
        <MessagesComponent
          messages={this.state.messages}
          toggleStar={this.toggleStar}
          toggleSelect={this.toggleSelect}
          bodyDisplay={this.state.bodyDisplay}
        />
        <ComposeComponent
          sendMessage={this.sendMessage}
          display={this.state.display}
        />
      </div>
    )
  }
}

export default App
