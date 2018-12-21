import React, { Component } from 'react';
const { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = Recharts;
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
        //Para cara view, simulo um valor anterior, podendo ser maior ou menor (somente para ilustrar melhor o gráfico)
        response.data.forEach(function(entry) {
          entry['prevViews'] = (entry.views * Math.random() * (3 - 0.8) + 0.8).toFixed(0);
        });
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

  createStructure() {}

  loading() {
    if (this.state.months.length > 0) {
      return (
        <ResponsiveContainer>
          <AreaChart data={this.state.months} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="prevViews" stroke="#9c9c9c" fill="#ececec" />
            <Area type="monotone" dataKey="views" stroke="#2fa4ff" fill="#2fa4ff" />
          </AreaChart>
        </ResponsiveContainer>
      );
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
      <div className={styles.section}>
        <div className={styles.container}>
          <span className={styles.trafficTitle}>Site Traffic Overview</span>
          <hr />
          {this.loading()}
        </div>
      </div>
    );
  }
}

export default Traffic;
