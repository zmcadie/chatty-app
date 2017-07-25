import React, {Component} from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.currentUser.name
    };
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.state.user} onKeyUp={(event) => {
          const username = event.target.value
          this.setState({
            user: username
          });
        }} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={(event) => {
          if (event.key === "Enter") {
            const message = {
              type: "message",
              username: this.state.user,
              content: event.target.value
            }
            this.props.addMessageToList(message);
            event.target.value = "";
          }
        }} />
      </footer>
    );
  }
}

export default ChatBar;