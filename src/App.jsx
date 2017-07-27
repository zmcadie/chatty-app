import React, {Component} from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {

  constructor() {
    super();
    this.state = {
      numberOfUsers: 1,
      currentUser: {name: "Anonymous"},
      messages: []
    };
    this.changeUsername = this.changeUsername.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.socket = new WebSocket("ws://localhost:3001");
  }
  componentDidMount() {
    this.socket.addEventListener("open", (event) => {
      console.log("Connected to server");
      this.socket.send(JSON.stringify({type: "initialConnect", username: this.state.currentUser.name, content: `${this.state.currentUser.name} has joined the chat`}));
    });
    this.socket.addEventListener("message", this.showMessage);
    this.socket.addEventListener("close", (event) => {
      this.socket.send(JSON.stringify({type: "connectionClose", content: `${this.state.currentUser.name} has left the chat`}));
    });
  }
  sendMessage(message) {
    if (message.content.match(/https?:\/\/.*\.(png|jpe?g|gif)/)) {
      message.type = "postImageMessage";
    }
    message.username = this.state.currentUser.name;
    this.socket.send(JSON.stringify(message));
  }
  changeUsername(event) {
    if (event.key === "Enter") {
      const username = event.target.value;
      const message = {
        type: "postSystemMessage",
        username: username,
        content: `${this.state.currentUser.name} changed their username to ${username}`
      }
      this.setState({ currentUser: { name: username } });
      // not calling sendMessage func because asynchronus setState, func sends old username to server causing delay in change
      this.socket.send(JSON.stringify(message));
    }
  }
  showMessage(message) {
    message = JSON.parse(message.data);
      if (message.userNumber) {
        this.setState({numberOfUsers: message.userNumber})
      }
      const newMessages = this.state.messages.concat(message);
      this.setState({ messages: newMessages });
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} users={this.state.numberOfUsers}/>
        <ChatBar sendMessage={this.sendMessage} currentUser={this.state.currentUser} changeUsername={this.changeUsername}/>
      </div>
    );
  }
}
export default App;
