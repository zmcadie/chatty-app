import React, {Component} from "react";

class Message extends Component {
  render() {
    let messageContainer = null;
    switch (this.props.message.type) {
      case "incomingSystemMessage":
        messageContainer =
          <div id={this.props.message.id} className="message system">
            {this.props.message.content}
          </div>;
        break;
      default:
        messageContainer =
          <div className="message">
            <span className="message-username">{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
          </div>;
        break;
    }
    return(
      messageContainer
    )
  }
}
export default Message;