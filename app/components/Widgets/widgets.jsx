import React, { Component } from 'react';
import styles from './widgets.less';
import axios from 'axios';
import WidgetBlock from '../WidgetBlock/widgetBlock';
// import WidgetBlock from './WidgetBlock';

class Widgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchWidgets: {
        newOrders: '',
        comments: '',
        newUsers: '',
        pageViews: ''
      }
    };
    this.fetchWidgets = this.fetchWidgets.bind(this);
  }

  fetchWidgets() {
    axios
      .get('http://dev.4all.com:3050/widgets')
      .then(response => {
        console.log('response', response);
        this.setState({
          fetchWidgets: response.data
        });
        console.log('fetchWidgets', this.state.fetchWidgets);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchWidgets();
  }

  createStructure() {
    const dictIcons = {
      newOrders: 'fa fa-shopping-bag',
      comments: 'far fa-comment',
      newUsers: 'far fa-user',
      pageViews: 'far fa-newspaper'
    };

    let structure = [];
    //Itera entre os atributos do objeto de retorno da API
    for (var key in this.state.fetchWidgets) {
      structure.push(<WidgetBlock className={dictIcons[key]} value={this.state.fetchWidgets[key]} />);
    }
    return structure;
  }

  render() {
    return (
      <div className={styles.widgets}>
        {this.createStructure()}
        {/* <button onClick={this.fetchWidgets}>Search</button> */}
        {/* <WidgetBlock value="10" />
        <WidgetBlock value="10" />
        <WidgetBlock value="10" />
        <WidgetBlock value="10" /> */}
      </div>
    );
  }
}

export default Widgets;
