import React from 'react';
import './Style/style.css';
import Messages from './Components/Messages';
import Input from './Components/Input';

const channelId = "CZD7BYdGVK2AM6lb";

const channelName ="observable-room";

let randomName = require('node-random-name'); 

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      members:[],
      member: {
        username: randomName(),
      },
    }

    this.drone = new window.Scaledrone(channelId, {
      data: this.state.member
    });
    
  }

  componentDidMount() {
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      };
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });

    const room = this.drone.subscribe(channelName);

    
    room.on('message', (message) => {
      const { data, id, member } = message;
      const messages = this.state.messages;
      messages.push({ id, member, text: data});
      this.setState({messages});
    });

    room.on('members', (members) => {
      this.setState({members});
    });

    room.on('member_join', (member) => {
      const memberJoin = this.state.members;
      memberJoin.push({member});
      this.setState({members: memberJoin});
    });

    room.on('member_leave', (member) => {
      const memberLeave = this.state.members.filter((members) => members.id !== member.id);
      this.setState(memberLeave);
    });
}

  onSendMessage = (message) => {
    this.drone.publish({
      room: channelName,
      message
    });
  }

  render() {
    return (
      <div className='main'>
        <h1 className='main-head'>Seminarski rad - Gordan Maksic</h1>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }
}
