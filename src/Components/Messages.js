import React from "react";

export default class Messages extends React.Component {
  render() {
    const {messages} = this.props;
    return (
        <div className="messages">
          <ul>
            {messages.map((m) => this.renderMessage(m))}
            <div
              ref={(lastLi) => {
                this.messagesEnd = lastLi;
              }}
            ></div>
          </ul>
        </div>
      );
    }
    scrollToBottom = () => {
      this.messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    componentDidUpdate = () => {
      this.scrollToBottom();
    }

  renderMessage(message) {
    const {member, text} = message;
    const {currentMember} = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className}>
      <span
        className="avatar"
        style={{backgroundColor: member.clientData.color}}
      />
        <div className="Message-content">
          <div className="username">
            {member.clientData.username}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}

