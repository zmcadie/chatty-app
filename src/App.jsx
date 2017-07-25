import React, {Component} from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {id: 1, type: "message", username: "Anonymous1", content: "I won't be impressed with technology until I can download food."},
        {id: 2, type: "system", content: "Anonymous1 changed their name to nomnom."}
      ]
    };
  }

  addMessage(message) {
    const newMessage = {
      id: Math.random(),
      type: message.type,
      username: message.username,
      content: message.content
    };
    const newMessages = this.state.messages.concat(newMessage);
    this.setState({
      messages: newMessages
    });
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar addMessageToList={this.addMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
