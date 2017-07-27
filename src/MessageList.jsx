import React, {Component} from "react";
import Message from "./Message.jsx";

class MessageList extends Component {

  render() {
    const messages = this.props.messages.map((message) => {
      return <Message key={message.id} message={message} />
    })
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div>{this.props.users} users online</div>
        </nav>
        <main className="messages">
          {messages}
        </main>
      </div>
    )
  }
}
export default MessageList;