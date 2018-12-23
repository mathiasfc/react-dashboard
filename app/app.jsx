import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./app.less";

import Widgets from "./components/Widgets/widgets";
import Traffic from "./components/Traffic/traffic";
import Chat from "./components/Chat/chat";

class App extends Component {
  constructor(props) {
    super(props);
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

ReactDOM.render(React.createElement(App), document.getElementById("app"), null);
