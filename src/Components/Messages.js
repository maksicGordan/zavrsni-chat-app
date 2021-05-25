import React from 'react';
import '../Style/style.css';

export default class Messages extends React.Component {
  render() {
    const messages = this.props.messages;
    return (
        <div className='list'>
          <ul>
            {messages.map((m) => this.renderMessage(m))}
            <div
              ref={(lastLi) => {
                this.messagesEnd = lastLi;
              }}
            >
            </div>
          </ul>
        </div>
      );
    }
    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: 'auto' });
    };
  
    componentDidUpdate = () => {
      this.scrollToBottom();
    }

  renderMessage = (message) => {
    const {member, id, text} = message;
    const currentMember = this.props.currentMember;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
      'Messages-message currentMember' : 'Messages-message';
    return (
      <li key={id} className={className}>
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