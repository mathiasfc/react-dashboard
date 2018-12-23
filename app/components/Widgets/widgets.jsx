import React, { Component } from "react";
import styles from "./widgets.less";
import axios from "axios";
import WidgetBlock from "../WidgetBlock/widgetBlock";

class Widgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchWidgets: {
        newOrders: "",
        comments: "",
        newUsers: "",
        pageViews: ""
      }
    };
    this.fetchWidgets = this.fetchWidgets.bind(this);
  }

  fetchWidgets() {
    axios
      .get("http://dev.4all.com:3050/widgets")
      .then(response => {
        console.log("response", response);
        this.setState({
          fetchWidgets: response.data
        });
        console.log("fetchWidgets", this.state.fetchWidgets);
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
      newOrders: "fa fa-shopping-bag",
      comments: "far fa-comment",
      newUsers: "far fa-user",
      pageViews: "far fa-newspaper"
    };

    let structure = [];
    //Itera entre os atributos do objeto de retorno da API
    for (var key in this.state.fetchWidgets) {
      let value = this.state.fetchWidgets[key];
      if (value.toString().length > 3) {
        value = this.formatValue(value);
      }
      structure.push(<WidgetBlock className={dictIcons[key]} value={value} name={key} />);
    }
    return structure;
  }

  formatValue(value) {
    return value > 999 ? (value / 1000).toFixed(1) + "k" : value;
  }

  render() {
    return <div className={styles.widgets}>{this.createStructure()}</div>;
  }
}

export default Widgets;
