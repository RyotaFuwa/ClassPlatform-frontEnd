import React, {Component} from "react";
import {connect} from 'react-redux';
import ClassList from "../../components/ClassList/ClassList";
import SearchBox from "../../components/SearchBox/SearchBox";
import {Create, Delete, Edit, Update, XSquare} from "../../icons";
import {Header, Page} from "../../components/Page/Page";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import titlize from "titlize";
import "./ClassRoom.css";

/* mongodb locally
const nodeFetch = require('node-fetch');
const API_URL = 'http://localhost:3001/api';
 */

import { getClasses, createClass, updateClass } from '../../firebase/firebase.firestore.classes';


//TODO: data structure of page and api call
const THEME = new Map([['default', {}], ['modern', {}], ['classic', {}], ['mono', {}],]);

const EditControl = props => {
  return (
    <span className='btn-group'>
      <span className='m-1'>
        <Create onClick={() => props.handleClick(0)} />
      </span>
      <span className='m-1'>
        <Update onClick={() => props.handleClick(1)} />
      </span>
      <span className='m-1'>
        <Delete onClick={() => props.handleClick(2)} />
      </span>
    </span>
  )
}

const CreateClassDialog = props => {
  const {name, tags, theme} = props.editingClass;
  return (
    <Dialog fullWidth maxWidth='sm' open={props.open} onClose={props.onClose}>
      <DialogTitle>Create a New Class</DialogTitle>
      <DialogContent>
        <div className='mb-5'>
          Title: &nbsp;
          <div className='ml-4'>
            <TextField margin="dense"  type="name"
                       value={name}
                       onChange={e => props.onChange({name: e.target.value})}
                       fullWidth/>
          </div>
        </div>
        <div className='mb-5'>
          Tags: &nbsp;
          <div className='m-4'>
            <TextField label='Comma Separated'
                       value={tags}
                       onChange={e => props.onChange({tags: e.target.value})}
                       fullWidth />
          </div>
        </div>
        <div className='mb-5'>
          Theme: &nbsp;
          <div className='ml-4'>
            <TextField value={theme}
                       onChange={e => props.onChange({theme: e.target.value})}
                       select fullWidth>
              {Array.from(THEME, ([key, value]) =>
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              )}
            </TextField>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onSubmit}> Create </Button>
        <Button onClick={props.onClose}> Cancel </Button>
      </DialogActions>
    </Dialog>
  );
}

const EditClassDialog = props => {
  const {name, tags, theme } = props.editingClass;
  return (
    <Dialog fullWidth maxWidth='sm'  open={props.open} onClose={props.onClose}>
      <DialogTitle>Edit a New Class</DialogTitle>
      <DialogContent>
        <div className='mb-5'>
          Class to Edit: &nbsp;
          <div className='ml-4'>
            <TextField select margin="dense"  type="name"
                       value={props.selectedIdx !== null ? props.selectedIdx : props.classList.length}
                       onChange={e => props.onSelect(e.target.value)}
                       fullWidth>
              {props.classList.map((each, idx) => (
                <MenuItem key={each.name} value={idx}>
                  {each.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
          <div className='mb-5'>
          Title: &nbsp;
          <div className='ml-4'>
            <TextField margin="dense"  type="name"
                       value={name}
                       onChange={e => props.onChange({name: e.target.value})}
                       fullWidth />
          </div>
        </div>
        <div className='mb-5'>
          Tags: &nbsp;
          <div className='m-4'>
            <TextField label='Comma Separated'
                       value={tags}
                       onChange={e => props.onChange({tags: e.target.value})}
                       fullWidth />
          </div>
        </div>
        <div className='mb-5'>
          Theme: &nbsp;
          <div className='ml-4'>
            <TextField select
                       value={theme}
                       onChange={e => props.onChange({theme: e.target.value})}
                       fullWidth>
              {Array.from(THEME, ([key, value]) =>
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              )}
            </TextField>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onSubmit()}>
          Edit
        </Button>
        <Button onClick={props.onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const DeleteClassDialog = props => (
  <Dialog fullWidth maxWidth='sm'  open={props.open} onClose={props.onClose}>
    <DialogTitle>Delete a New Class</DialogTitle>
    <DialogContent>
      <div className='mb-5'>
        Class to Delete: &nbsp;
        <div className='ml-4'>
          <TextField select margin="dense"  type="name"
                     value={props.selectedIdx !== null ? props.selectedIdx : props.classList.length}
                     onChange={e => props.onSelect(e.target.value)}
                     fullWidth>
            {props.classList.map((each, idx) => (
              <MenuItem key={each.name} value={idx}>
                {each.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => props.onSubmit()}>
        Delete
      </Button>
      <Button onClick={props.onClose}>
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
)


//TODO: Use TextField, DialogTitle
//TODO: deploy ways to upload img and retreive it

class ClassBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchSubstring: "",
      classList: [],

      //editing class info
      selectedIdx: null,
      name: '',
      tags: '',
      theme: 'default',

      popup: null,
    }
  }

  async componentDidMount() {
    /* mongodb
    nodeFetch(`${API_URL}/classes`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => res.json())
      .then(json => this.setState({classList: json.classes}))
      .catch(rej => console.log(rej));
   */
    const querySnapshot = await getClasses();
    let classList = querySnapshot.docs.map(doc => ({...doc.data(), classId: doc.id}));
    if(!this.props.currentUser.admin) {
      classList = classList.filter(cls => cls.active);
    }
    console.log(classList);
    this.setState({classList: classList});
  }

  onSelect(idx) {
    let {name, tags, theme} = this.state.classList[idx];
    this.setState({selectedIdx: idx, name: name, tags: tags, theme: theme});
  }


  async createClass() {
    // const tags = tagString.split(',').map(each => each.replace(/^\s+|\s+$/g, ''));

    // cloud firestore
    const {name, theme, tags} = this.state;
    const titlizedName = titlize(name);
    let sameNameClassAlreadyExists = this.state.classList.filter(each => each.name === titlizedName).length > 0
    if(sameNameClassAlreadyExists) {
      alert('a class with the same name already exists.');
      return;
    }

    const newClass = {name: titlizedName, tags: tags, theme: theme, author: this.props.currentUser, active: true};

    try {
      const documentRefernce = await createClass(newClass);
      this.setState(state => ({
        classList: [...state.classList, {...newClass, classId: documentRefernce.id}],
        name: '',
        tags: '',
        theme: 'default',
        popup: null
      }))
    }
    catch(err) {
      alert(`Failed to create a new class: ${err}`);
    }
  }

  async editClass() {
    /* now edit operation is active only for admin users so this functionality is not needed.
    const { classId, author } = this.state.classList[this.state.selectedIdx];
    let qualifiedToEdit = !this.props.currentUser.admin && author !== this.props.currentUser;
    if(qualifiedToEdit) {
      alert('Not authorized to edit')
      return;
    }
    */

    //firebase
    const { classId } = this.state.classList[this.state.selectedIdx];
    const {name, tags, theme } = this.state;
    const titlizedName = titlize(name);
    const updatingFields = {name: titlizedName, tags: tags, theme: theme};
    try {
      await updateClass(classId, updatingFields);
      this.setState(state => {
        Object.assign(state.classList[state.selectedIdx], updatingFields);
        return {
          classList: [...state.classList],
          name: '',
          tags: '',
          theme: 'default',
          selectedIdx: null,
          popup: null,
        };
      })
    }
    catch(err) {
      alert(`Failed to update a class: ${err}`);
    }
  }

  async deleteClass() {
    //firebase
    // this function doesn't delete classes. what it actually does is to make a class inactive.
    const { classId } = this.state.classList[this.state.selectedIdx];
    try {
      await updateClass(classId, {active: false});
      this.setState(state => {
        Object.assign(state.classList[state.selectedIdx], {active: false});
        return {classList: [...state.classList]}
      })
    }
    catch(err) {
      alert('Failed to delete(inactivate) the class');
    }
  }

  editDialogs() {
    const {name, tags, theme, selectedIdx} = this.state;
    return (
      <>
        <CreateClassDialog open={this.state.popup === 0}
                           editingClass={{name, tags, theme}}
                           onChange={updateFields => this.setState(updateFields)}
                           onClose={() => this.setState({popup: null, name: '', tags: '', theme: ''})}
                           onSubmit={() => this.createClass()} />
        <EditClassDialog open={this.state.popup === 1}
                         classList={this.state.classList}
                         selectedIdx={selectedIdx}
                         editingClass={{name, tags, theme}}
                         onSelect={idx => this.onSelect(idx)}
                         onChange={updateFields => this.setState(updateFields)}
                         onClose={() => this.setState({popup: null, selectedIdx: null, name: '', tags: '', theme: ''})}
                         onSubmit={() => this.editClass()} />
        <DeleteClassDialog open={this.state.popup === 2}
                           classList={this.state.classList}
                           selectedIdx={selectedIdx}
                           editingClass={{name, tags, theme}}
                           onSelect={idx => this.onSelect(idx)}
                           onClose={() => this.setState({popup: null, selectedIdx: null})}
                           onSubmit={() => this.deleteClass()} />
     </>
    )
  }

  render() {
    let {classList, searchSubstring} = this.state;
    let matchedClasses = classList.filter(each =>
      each.name.toLowerCase().includes(searchSubstring.toLowerCase()));
    let admin = (this.props.currentUser && this.props.currentUser.admin);
    return (
      <>
        <Page>
          <Header
            left={(
              <div className='title'> Class Board
                {admin &&
                <EditControl handleClick={idx => this.setState(state => ({popup: state.popup === null ? idx : null}))} />
                }
              </div>
            )}
            center={
              <SearchBox placeholder='Search Class' onChange={e => this.setState({searchSubstring: e.target.value})}/>
            }
          />
        <ClassList classList={matchedClasses}/>
        </Page>
        {this.editDialogs()}
      </>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(ClassBoard);


