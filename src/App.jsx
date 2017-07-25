import React, {Component} from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";
const newSocket = new WebSocket("ws://localhost:3001");

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Anonymous1"},
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.socket = newSocket
  }
  componentDidMount() {
    if (this.socket) console.log("Connected to server");
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
      currentUser: newMessage.username,
      messages: newMessages
    });
    this.socket.send(`${message.username} says ${message.content}`);
  }
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar addMessageToList={this.addMessage} currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
