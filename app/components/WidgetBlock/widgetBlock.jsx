import React, { Component } from 'react';
import styles from './widgetBlock.less';

class WidgetBlock extends Component {
  //Se já possuir as informações, renderiza, se não, apresenta um loader
  loading() {
    const value = this.props.value;
    const name = this.props.name;
    if (value && name) {
      return (
        <div>
          <span>{value}</span>
          <span>{this.formatName(name)}</span>
        </div>
      );
    }
    return (
      <div>
        <span>
          <i className="fas fa-spinner fa-spin" />
        </span>
      </div>
    );
  }

  //Formata o nome dos widgets de acordo com o retorno da API.
  formatName(name) {
    const dictNames = {
      newOrders: 'New Orders',
      comments: 'Comments',
      newUsers: 'New Users',
      pageViews: 'Page Views'
    };

    return dictNames[name];
  }

  render() {
    return (
      <div className={styles.widget}>
        <div className={`${styles.icon} ${this.props.name}`}>
          <i className={this.props.className} />
        </div>
        <div className={styles.rightContent}>{this.loading()}</div>
      </div>
    );
  }
}

export default WidgetBlock;
