import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from './app.less';

import Widgets from './components/Widgets/widgets';
import Traffic from './components/Traffic/traffic';
import Chat from './components/Chat/chat';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchUser: {
        userId: '',
        id: '',
        title: '',
        completed: ''
      }
    };
    this.fetchUser = this.fetchUser.bind(this);
  }

  fetchUser() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos/10')
      .then(response => {
        console.log('response', response);
        this.setState({
          fetchUser: response.data
        });
        console.log('fetchUser', this.state.fetchUser);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <span className={styles.dashboard}>Dashboard</span>
        <Widgets />
        <Traffic /> 
        <Chat /> 
      </div>
    );
  }
}

ReactDOM.render(React.createElement(App), document.getElementById('app'), null);
