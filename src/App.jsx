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
    });
    this.socket.addEventListener("message", this.showMessage);
  }
  sendMessage(message) {
    message.username = this.state.currentUser.name;
    this.socket.send(JSON.stringify(message));
  }
  changeUsername(username) {
    this.setState({ currentUser: {name: username} })
  }
  showMessage(message) {
    message = JSON.parse(message.data);
    switch (message.type) {
      case "incomingUserNumber":
        this.setState({numberOfUsers: message.userNumber})
        break;
      default:
        const newMessages = this.state.messages.concat(message);
        this.setState({ messages: newMessages });
        break;
    }
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
