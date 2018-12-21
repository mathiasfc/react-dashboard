import React, { Component } from 'react';
import styles from './traffic.less';
import axios from 'axios';

class Traffic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: []
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    axios
      .get('http://dev.4all.com:3050/pageViews')
      .then(response => {
        console.log('response', response);
        this.setState({
          months: response.data
        });
        console.log('fetchData', this.state.fetchData);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  createStructure() {
    debugger;
  }

  render() {
    return (
      <div>
        {this.createStructure()}
      </div>
    );
  }
}

export default Traffic;
