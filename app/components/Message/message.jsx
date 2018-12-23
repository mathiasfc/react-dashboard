import React, { Component } from "react";
import styles from "./message.less";

class Message extends Component {
  createMsgBlock() {
    const userName = this.props.msg.userName;
    const portrait = this.props.msg.portrait;
    const message = this.props.msg.message;
    const orientation = this.props.msg.displayPortraitLeft ? "imgLeft" : "imgRight";
    const time = this.props.msg.time;

    if (userName) {
      return (
        <div className={styles.msgBlock}>
          <div className={orientation}>
            {this.imgBlock(portrait)}
            <div className="msgTitle">
              <span className="userName">{userName}</span>
              <span className="msgTime">{time}</span>
            </div>
            <div className="msgBody">
              <span className="msgTxt">{message}</span>
            </div>
          </div>
          <hr></hr>
        </div>
        
      );
    }
  }

  imgBlock(portrait) {
    if (portrait == "orange") {
      return <div className="userImgOrange" />;
    } else {
      return <img className="userImg" src={portrait} />;
    }
  }

  formatName(name) {
    const dictNames = {
      newOrders: "New Orders",
      comments: "Comments",
      newUsers: "New Users",
      pageViews: "Page Views"
    };
    return dictNames[name];
  }

  render() {
    return <div>{this.createMsgBlock()}</div>;
  }
}

export default Message;
