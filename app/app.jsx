import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from './app.less';

import Widgets from './components/Widgets/widgets';

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
      //   <div>
      //     <Hello name="worlsd" />
      //     <Hello name="React" />
      //     <Hello name="Less" />
      //   </div>
      <div>
        <p className={styles.dashboard}>Dashboard</p>
        {/* <button onClick={this.fetchUser}>Search</button> */}
        <Widgets userId={this.state.fetchUser.userId} id={this.state.fetchUser.id} title={this.state.fetchUser.title} />
      </div>
    );
  }
}

ReactDOM.render(React.createElement(App), document.getElementById('app'), null);
