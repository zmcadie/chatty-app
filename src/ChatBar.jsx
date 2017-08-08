import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.currentUser.name,
    };
    this.sendIfEnter = this.sendIfEnter.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  sendIfEnter(event) {
    if (event.key === 'Enter') {
      const message = {
        type: 'postMessage',
        content: event.target.value
      }
      this.props.sendMessage(message);
      event.target.value = '';
    }
  }

  changeUser(event) {
    const username = event.target.value;
    this.props.changeUsername(username);
  }

  render() {
    return (
      <footer className='chatbar'>
        <input className='chatbar-username' placeholder='Your Name (Optional)' onBlur={this.changeUser} />
        <input className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyDown={this.sendIfEnter} />
      </footer>
    );
  }
}
export default ChatBar;