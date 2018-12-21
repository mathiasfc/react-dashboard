import React, { Component } from 'react';
import styles from './chat.less';
import axios from 'axios';

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

  createStructure() {}

  loading() {
    if (this.state.messages.length > 0) {
      return <div />;
    }
    return (
      <div className="loading">
        <span>
          <i className="fas fa-spinner fa-spin" />
        </span>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.container}>
      <div className="header">
        <i className="far fa-comments"></i><span className={styles.chatTitle}>Chat</span>
        </div>
        <hr />
      </div>
    );
  }
}

export default Chat;
