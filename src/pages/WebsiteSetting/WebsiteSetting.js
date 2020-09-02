import React, {Component} from 'react';
import './WebsiteSetting.css';
import {Header, Page} from "../../components/Page/Page";
import {Delete, Update} from "../../icons";
import TextField from "@material-ui/core/TextField";
import {getUsersByName, updateUser} from "../../firebase/firebase.firestore.users";
import UserList from "./components/UserList";

const Row = props => {
  return (
    <div className='website-setting-row'>
      <h5>{props.title}</h5>
      {props.children}
    </div>
  )
}

// integrate redux
class WebsiteSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverLocation: 'web', // redux value
      userSearchString: "",
      matchedUsers: [],
    }
  }

  async searchUser() {
    if(!this.state.userSearchString) return;
    let matchedUsers = await getUsersByName(this.state.userSearchString);
    this.setState({matchedUsers: matchedUsers, userSearchString: ""});
  }

  async handleChange(idx, updatingField) {
    let userId = this.state.matchedUsers[idx].id;
    try {
      await updateUser(userId, updatingField);
      this.setState(state => {
        let matchedUsers = state.matchedUsers;
        Object.assign(matchedUsers[idx], updatingField);
        return {matchedUsers: [...matchedUsers]}
      })
    } catch(err) {
      console.log(err);
      alert('Failed to Update.')
    }
  }

  render() {
    let {matchedUsers} = this.state;
    if(matchedUsers.length > 10)
      matchedUsers = matchedUsers.splice(10);
    return (
      <Page>
        <Header center={<span className='title'>Website Setting</span>} />
        <div className='setting'>
          <Row title='API Server Location'>
            <div className='w-100 website-setting-serverLocation'>
              <div>
                <input
                  type="radio"
                  name="serverLocation"
                  onChange={() => this.setState({serverLocation: 'web'})}
                  checked={this.state.serverLocation === 'web'}
                />
                <label> On the Web </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="serverLocation"
                  onChange={() => this.setState({serverLocation: 'premise'})}
                  checked={this.state.serverLocation === 'premise'}
                />
                <label> On Premise </label>
              </div>
            </div>
          </Row>
          <Row title='User Setting'>
            <div className='text-center'>
              <TextField
                variant='outlined'
                size='small'
                placeholder='User Name'
                type='text'
                name='userPermission'
                onChange={e => this.setState({userSearchString: e.target.value})}
                onKeyDown={e => {
                  if(e.key === "Enter")
                    this.searchUser();
                }}
              />
              {
                <UserList users={matchedUsers} handleChange={(idx, uf) => this.handleChange(idx, uf)} />
              }
            </div>
          </Row>
        </div>
        <div className='h5 text-center'>
          <Update />
          <Delete />
        </div>
      </Page>
    )
  }
}
export default WebsiteSetting;
