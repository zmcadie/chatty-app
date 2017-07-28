import React, {Component} from "react";

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.currentUser.name,
    };
    this.ifEnter = this.ifEnter.bind(this);
  }
  ifEnter(event) {
    if (event.key === "Enter") {
      const message = {
        type: "postMessage",
        content: event.target.value
      }
      this.props.sendMessage(message);
      event.target.value = "";
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.state.user} onKeyDown={this.props.changeUsername} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.ifEnter} />
      </footer>
    );
  }
}
export default ChatBar;