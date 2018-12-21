import React, { Component } from 'react';
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } = Recharts;
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
    const data = [{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 }, { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 }, { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 }, { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 }, { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 }, { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }];
    return (
      <div className={styles.container}>
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}

export default Traffic;
