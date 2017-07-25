import React, {Component} from "react";

class Message extends Component {
  render() {
    const isSystem = this.props.message.type;
    let messageContainer = null;
    if (isSystem === "system") {
      messageContainer = <div id={this.props.message.id} className="message system">
          {this.props.message.content}
        </div>
    } else {
      messageContainer = <div className="message">
          <span className="message-username">{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
    }
    return(
      messageContainer
    )
  }
}
export default Message;