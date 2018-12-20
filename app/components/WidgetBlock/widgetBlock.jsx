import React, { Component } from 'react';
import styles from './widgetBlock.less';

class WidgetBlock extends Component {
  loading() {
    const value = this.props.value;
    if (value) {
      return <span>{this.props.value}</span>;
    }
    return (
      <span>
        <i className="fas fa-spinner fa-spin" />
      </span>
    );
  }

  render() {
    return (
      <div className={styles.widget}>
        {/* <div><i className="fa fa-shopping-bag"></i></div>
        <div><i className="far fa-comment"></i></div>
        <div><i className="far fa-user"></i></div>
        <div><i className="far fa-newspaper"></i></div> */}
        <div className={styles.icon}>
          <i className={this.props.className} />
        </div>
        <div>{this.loading()}</div>
      </div>
    );
  }
}

export default WidgetBlock;
