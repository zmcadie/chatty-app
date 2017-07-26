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
    this.changeUsername = this.changeUsername.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }
  componentDidMount() {
    newSocket.addEventListener("open", (event) => {
      console.log("Connected to server");
    });
    newSocket.addEventListener("message", this.showMessage);
  }
  sendMessage(message) {
    debugger;
    message.username = this.state.currentUser.name;
    newSocket.send(JSON.stringify(message));
  }
  changeUsername(username) {
    this.setState({ currentUser: {name: username} })
  }
  showMessage(message) {
    message = JSON.parse(message.data);
    const newMessages = this.state.messages.concat(message);
    this.setState({ messages: newMessages });
  }
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar sendMessage={this.sendMessage} currentUser={this.state.currentUser} changeUsername={this.changeUsername}/>
      </div>
    );
  }
}
export default App;
