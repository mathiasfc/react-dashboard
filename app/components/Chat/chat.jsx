import React, { Component } from 'react';
import styles from './chat.less';
import axios from 'axios';
import Message from '../Message/message';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.loadMessages = this.loadMessages.bind(this);
  }

  loadMessages() {
    axios
      .get('http://dev.4all.com:3050/messages')
      .then(response => {
        console.log('response', response);
        this.setState({
          messages: response.data
        });
        console.log('loadMessages', this.state.loadMessages);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadMessages();
  }

  createStructure() {
    let messages = this.state.messages;
    let structure = [];

    messages.forEach(function(msg) {
      //console.log(msg);
      //let className = msg.displayPortraitLeft ? 'imgLeft' : 'imgRight';
      structure.push(<Message msg={msg} />);
    });

    return structure;
  }

  loading() {
    if (this.state.messages.length > 0) {
      return <div className="chatContainer">{this.createStructure()}</div>;
    }
    return (
      <div className="loading">
        <span>
          <i className="fas fa-spinner fa-spin" />
        </span>
      </div>
    );
  }

  msgSender(){
    return (
      <div className="msgSender">
        <input type="text"></input><button>Send</button>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="header">
          <i className="far fa-comments" />
          <span>Chat</span>
        </div>
        <hr />
        {this.loading()}

        {this.msgSender()}
      </div>
    );
  }
}

export default Chat;
