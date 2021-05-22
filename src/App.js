import React from 'react';
import './App.css';
import Messages from "./Components/Messages";
import Input from "./Components/Input";

const channelId = "CZD7BYdGVK2AM6lb";

var randomName = require('node-random-name'); 
let randomColor = require("randomcolor");

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      member: {
        username: randomName(),
        color: randomColor()
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
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });

    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
}

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Brzojav</h1>
        </div>
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
