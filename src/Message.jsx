import React, {Component} from "react";

class Message extends Component {
  componentDidMount() {
    const element = document.getElementById(this.props.message.id);
    element.scrollIntoView();
  }

  render() {
    let messageContainer = null;
    const userClass = `message-username text-${this.props.message.color}`;
    const username = <span className={userClass}>{this.props.message.username}</span>;
    switch (this.props.message.type) {
      case "incomingSystemMessage":
        messageContainer =
          <div id={this.props.message.id} className="message system">
            {this.props.message.content}
          </div>;
        break;
      case "incomingImageMessage":
        messageContainer =
          <div id={this.props.message.id} className="message">
            {username}
            <span className="message-content">
              <div>{this.props.message.content}</div>
              <img src={this.props.message.imageUrl} className="message-image"/>
            </span>
          </div>;
        break;
      default:
        messageContainer =
          <div id={this.props.message.id} className="message">
            {username}
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