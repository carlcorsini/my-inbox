import React, { Component } from 'react'

class ComposeComponent extends Component {
  state = {
    subject: '',
    body: ''
  }

  render() {
    const { sendMessage } = this.props

    return (
      <form
        style={{ display: this.props.display ? 'block' : 'none' }}
        className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">
            Subject
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="Enter a subject"
              name="subject"
              onChange={e => {
                this.setState({
                  subject: e.target.value
                })
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">
            Body
          </label>
          <div className="col-sm-8">
            <textarea
              name="body"
              id="body"
              className="form-control"
              onChange={e => {
                this.setState({
                  body: e.target.value
                })
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input
              onClick={() => {
                sendMessage(this.state)
              }}
              type="button"
              value="Send"
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    )
  }
}

export default ComposeComponent
