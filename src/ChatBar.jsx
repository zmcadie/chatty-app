import React, {Component} from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.currentUser.name
    };
    this.ifEnter = this.ifEnter.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
  ifEnter(event) {
    if (event.key === "Enter") {
      const message = {
        type: "message",
        content: event.target.value
      }
      this.props.sendMessage(message);
      event.target.value = "";
    }
  }
  changeUser(event) {
    if (event.key === "Enter") {
      const username = event.target.value;
      const message = {
        type: "system",
        username: null,
        content: `${this.state.user} changed their username to ${username}`
      }
      this.props.changeUsername(username);
      this.props.sendMessage(message);
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.state.user} onKeyUp={this.changeUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.ifEnter} />
      </footer>
    );
  }
}
export default ChatBar;