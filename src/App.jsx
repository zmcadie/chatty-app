import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

// 'colors' correlate to sass variables in style/colors.scss, allows for easy color change
const colors = ['one', 'two', 'three', 'four', 'five', 'six'];

class App extends Component {

  constructor() {
    super();
    this.state = {
      numberOfUsers: 1,
      currentUser: {name: 'Anonymous'},
      messages: []
    };
    this.changeUsername = this.changeUsername.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.recieveMessage = this.recieveMessage.bind(this);
    this.socket = new WebSocket('ws://localhost:3001');
  }

  setColor() {
    const num = Math.floor(Math.random() * colors.length);
    const body = document.querySelector('body');
    const color = colors[num];
    this.setState({color: color});
    // changes color of parent element, not best practice but had css bug
    // where setting react-root element color left white strip at bottom of screen
    body.setAttribute('class', `color-${color}`);
  }

  //////////////////////////////////////////////////////////
  /////                                                  ///
  //// Functions for handling communication with server ////
  ///                                                  /////
  //////////////////////////////////////////////////////////
  initialConnect() {
    this.setColor();
    const message = {
      color: `text-${this.state.color}`,
      type: 'initialConnect',
      username: this.state.currentUser.name,
      content: `${this.state.currentUser.name} has joined the chat`,
    }
    this.socket.send(JSON.stringify(message));
  }

  changeUsername(username) {
    const message = {
      type: 'postSystemMessage',
      username: username,
      content: `${this.state.currentUser.name} changed their username to ${username}`
    }
    this.setState({ currentUser: { name: username } });
    // not calling sendMessage func because asynchronus setState, func sends old username to server causing delay in change
    this.socket.send(JSON.stringify(message));
  }

  sendMessage(message) {
    if (message.content.match(/https?:\/\/.*\.(png|jpe?g|gif)/)) {
      message.type = 'postImageMessage';
    }
    message.color = this.state.color;
    message.username = this.state.currentUser.name;
    this.socket.send(JSON.stringify(message));
  }

  recieveMessage(message) {
    let parsedMessage = JSON.parse(message.data);
    if (parsedMessage.userNumber) {
      this.setState({numberOfUsers: parsedMessage.userNumber})
    }
    const newMessages = this.state.messages.concat(parsedMessage);
    this.setState({ messages: newMessages });
  }

  //////////////////////////////////////////////////////////////
  /////                                                      ///
  //// makes sure things are only called once app is loaded ////
  ///                                                      /////
  //////////////////////////////////////////////////////////////
  componentDidMount() {
    this.socket.addEventListener('open', () => {
      this.initialConnect();
    });
    this.socket.addEventListener('message', this.recieveMessage);
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} users={this.state.numberOfUsers} />
        <ChatBar sendMessage={this.sendMessage} currentUser={this.state.currentUser} changeUsername={this.changeUsername} />
      </div>
    );
  }
}
export default App;
