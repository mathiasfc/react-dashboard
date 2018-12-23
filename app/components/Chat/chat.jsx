import React, { Component } from "react";
import styles from "./chat.less";
import axios from "axios";
import Message from "../Message/message";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputValue: ""
    };
    this.chatScroll = null;
    this.loadMessages = this.loadMessages.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.onEnterClick = this.onEnterClick.bind(this);
  }

  //Carrega as mensagens via API
  loadMessages() {
    if (this.state.messages.length == 0) {
      axios
        .get("http://dev.4all.com:3050/messages")
        .then(response => {
          console.log("response", response);
          this.setState({
            messages: response.data
          });
          console.log("loadMessages", this.state.loadMessages);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  //Atualiza o texto digitado
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  //Novo Objeto que representa a nova mensagem
  newMessage() {
    return {
      userName: "Eu",
      portrait: "orange",
      message: this.state.inputValue,
      displayPortraitLeft: true,
      time: "1 min ago"
    };
  }

  //Requisição POST para API, independente do retorno, insere uma nova mensagem no chat
  sendMsg() {
    if (this.state.inputValue) {
      axios
        .post("http://dev.4all.com:3050/messages")
        .then(response => {
          console.log("response", response);
          let msg = this.newMessage();
          this.state.messages.push(msg);
          this.setState({
            messages: this.state.messages
          });
          this.scrollToBottom();
          this.setState({
            inputValue: ""
          });
          console.log("sendMsg", this.state.sendMsg);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    this.loadMessages();
  }

  //Devolve um array com todas as mensagens retornadas pela API
  createStructure() {
    let messages = this.state.messages;
    let structure = [];

    messages.forEach(function(msg) {
      structure.push(<Message msg={msg} />);
    });

    return structure;
  }

  //Se já possuir as informações, renderiza, se não, apresenta um loader
  loading() {
    if (this.state.messages.length > 0) {
      return (
        <div ref={ref => (this.chatScroll = ref)} className="chatContainer">
          {this.createStructure()}
        </div>
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

  //Função que scrolla o chat para baixo
  scrollToBottom() {
    this.chatScroll.scrollTo({
      top: this.chatScroll.offsetTop + this.chatScroll.offsetHeight,
      behavior: "smooth"
    });
  }

  //Handler para ao clicar no Enter enviar a mensagem digitada
  onEnterClick(e) {
    if (e.key === "Enter") {
      this.sendMsg();
    }
  }

  msgSender() {
    return (
      <div className="msgSender">
        <input type="text" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} onKeyPress={this.onEnterClick} placeholder="Type your message here..." />
        <button onClick={this.sendMsg}>Send</button>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="header">
          <i className="far fa-comments" />
          <span>Chat</span>
        </div>
        <hr className="titleLine" />
        {this.loading()}
        {this.msgSender()}
      </div>
    );
  }
}

export default Chat;
