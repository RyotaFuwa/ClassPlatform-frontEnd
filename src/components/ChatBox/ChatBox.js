import React, {Component, createRef, Fragment} from "react";
import "./ChatBox.css";
import {Send} from "../../icons";
import {importMessagesAt, postMessageAt, subscribeLastMessage} from "../../firebase/firebase.firestore.classes";
import MessageBox from "../MessageBox/MessageBox";
import Chip from "@material-ui/core/Chip";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      newText: "",
      messages: [],
      yourself: this.props.currentUser,
    }
    this.messageListRef = createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.snapshotCallback = this.snapshotCallback.bind(this);
  }

  async componentDidMount() {
    this.unsubscribe = subscribeLastMessage(this.props.chatId, this.snapshotCallback);
    const snapshot = await importMessagesAt(this.props.chatId);
    let docs = snapshot.docs;
    if(docs.length >= 150) {
      docs.slice(docs.length - 100).forEach(doc => {
        doc.ref.delete();
      })
      docs = docs.slice(docs.length - 100);
    }
    if(docs.length > 0) {
      let now = new Date();
      docs = docs.filter(doc => {
        let TwoDaysEarlier = now.getTime() - doc.data().createdAt.toDate().getTime() > 86400000; //delete all messages earlier than a day
        if(TwoDaysEarlier) doc.ref.delete();
        return !TwoDaysEarlier;
      })
    }
    if(docs.length > 0) {
      if (docs.length >= 100)
        this.setState({messages: docs.slice(-100).map(doc => doc.data())});
      else
        this.setState({messages: docs.map(doc => doc.data())});
    }
  }

  async snapshotCallback(snapshot) {
    if(snapshot.docs && snapshot.size === 1) {
      this.setState(state => ({messages: [...state.messages, snapshot.docs[0].data()]}));
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.scrollToButton()
    if(this.state.messages.length > 150) {
      this.setState(state => ({messages: [...state.messages.slice(-100)]}));
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  scrollToButton() {
    this.messageListRef.current.scrollTop = this.messageListRef.current.scrollHeight;
  }

  async handleKeyDown(e) {
    if(e.key === 'Enter') {
      e.preventDefault();
      await this.submitMessage();
    }
  }

  async submitMessage() {
    // do submit;
    if(this.state.newText.length === 0) return;
    let postText = this.state.newText;
    this.setState({newText: ""}, async () => {
        await postMessageAt(this.props.chatId, postText, this.state.yourself);
    });
  }

  render() {
    let now = new Date();
    let agesAgo = [];
    let pastPoints = [
      {time: 300000, literal: "5min earlier", messages: []},
      {time: 3600000,literal: "1hour earlier", messages: []},
      {time: 86400000, literal: "1day earlier", messages: []},
    ]
    {this.state.messages.forEach((message, idx) => {


      let contained = false;
      let elapsedTime = now.getTime() - message.createdAt.toDate().getTime();
      for(const p of pastPoints) {
        if(elapsedTime < p.time) {
          p.messages.push(message)
          contained = true;
          break;
        }
      }
      if(!contained) agesAgo.push(message)
    })}
    return (
      <div
        className='chat-box'
        onMouseEnter={() => {
          if(!this.state.opened) {
            this.scrollToButton()
            this.setState({opened: true});
          }
        }}
      >
        <div className='chat-header'>
           {this.props.name}
        </div>
        <div className='message-list scrollable' ref={this.messageListRef}>
          {pastPoints.reverse().map(each =>
            <Fragment key={each.time}>
              <div className='m-5'><Chip label={each.literal} /></div>
              {each.messages.map((message, idx) => {
                let himself = false;
                if(message.author.id === this.state.yourself.id)
                  himself = true;
                return <MessageBox key={idx} message={message} himself={himself}/>;
              })}
            </Fragment>
          )}
        </div>
        <textarea
          className='new-text'
          value={this.state.newText} onChange={e => this.setState({newText: e.target.value})}
          onKeyDown={this.handleKeyDown}
        />
        <div className='send-button'>
          <Send onClick={this.submitMessage} />
        </div>
      </div>
    )
  }
}

export default ChatBox;
