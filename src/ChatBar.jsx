import React, {Component} from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser.name,
      user: this.props.currentUser.name
    };
  }
  ifEnter(event) {
    if (event.key === "Enter") {
      const message = {
        type: "message",
        username: this.state.user,
        content: event.target.value
      }
      this.props.addMessageToList(message);
      event.target.value = "";
    }
  }
  userChange(event) {
    const username = event.target.value
    this.setState({
      user: username
    });
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.state.user} onKeyUp={this.userChange.bind(this)} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.ifEnter.bind(this)} />
      </footer>
    );
  }
}
export default ChatBar;