import React, {Component} from "react";
import ClassList from "../../components/ClassList/ClassList";
import SearchBox from "../../components/SearchBox/SearchBox";
import "./ClassRoom.css";
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
import NotFound from "../../components/NotFound/NotFound";

const nodeFetch = require('node-fetch');
const API_URL = 'http://localhost:3001/api';


//TODO: data structure of page and api call
const THEME = new Map([['default', {}], ['modern', {}], ['classic', {}], ['mono', {}],]);

const CreateClassDialog = props => {
  return (
    <>
      <Dialog fullWidth maxWidth='sm' open={props.open} onClose={props.onClose}>
        <DialogTitle>Create a New Class</DialogTitle>
        <DialogContent>
          <div className='mb-5'>
            Title: &nbsp;
            <div className='ml-4'>
              <TextField margin="dense"  type="name"
                         value={props.cls.title}
                         onChange={e => props.onChange({...props.cls, title: e.target.value})}
                         fullWidth/>
            </div>
          </div>
          <div className='mb-5'>
            Tags: &nbsp;
            <div className='m-4'>
              <TextField label='Comma Separated'
                         value={props.cls.tags}
                         onChange={e => props.onChange({...props.cls, tags: e.target.value})}
                         fullWidth />
            </div>
          </div>
          <div className='mb-5'>
            Theme: &nbsp;
            <div className='ml-4'>
              <TextField value={props.cls.theme}
                         onChange={e => props.onChange({...props.cls, theme: e.target.value})}
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
    </>
  );
}

const EditClassDialog = props => {
  if(props.classList.length === 0) {
    return (
      <Dialog fullWidth maxWidth='sm'  open={props.open} onClose={props.onClose}>
        <DialogTitle>No Class To Edit</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button onClick={props.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }
  return (
    <>
      <Dialog fullWidth maxWidth='sm'  open={props.open} onClose={props.onClose}>
        <DialogTitle>Edit a New Class</DialogTitle>
        <DialogContent>
          <div className='mb-5'>
            Class to Edit: &nbsp;
            <div className='ml-4'>
              <TextField select margin="dense"  type="name"
                         value={props.idx !== null ? props.idx : props.classList.length}
                         onChange={e => props.onSelect(e.target.value)}
                         fullWidth>
                {props.classList.map((each, idx) => (
                  <MenuItem key={each.title} value={idx}>
                    {each.title}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
            <div className='mb-5'>
            Title: &nbsp;
            <div className='ml-4'>
              <TextField margin="dense"  type="name"
                         value={props.cls.title}
                         onChange={e => props.onChange({...props.cls, title: e.target.value})}
                         fullWidth />
            </div>
          </div>
          <div className='mb-5'>
            Tags: &nbsp;
            <div className='m-4'>
              <TextField label='Comma Separated'
                         value={props.cls.tags}
                         onChange={e => props.onChange({...props.cls, tags: e.target.value})}
                         fullWidth />
            </div>
          </div>
          <div className='mb-5'>
            Theme: &nbsp;
            <div className='ml-4'>
              <TextField select
                         value={props.cls.theme}
                         onChange={e => props.onChange({...props.cls, theme: e.target.value})}
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
    </>
  );
}

const DeleteClassDialog = props => {
  if(props.classList.length === 0) {
    return (
      <Dialog fullWidth maxWidth='sm' open={props.open} onClose={props.onClose}>
        <DialogTitle>No Class To Delete</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button onClick={props.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }
  return (
    <>
      <Dialog fullWidth maxWidth='sm'  open={props.open} onClose={props.onClose}>
        <DialogTitle>Create a New Class</DialogTitle>
        <DialogContent>
          <div className='mb-5'>
            Class to Delete: &nbsp;
            <div className='ml-4'>
              <TextField select margin="dense"  type="name"
                         value={props.idx !== null ? props.idx : props.classList.length}
                         onChange={e => props.onSelect(e.target.value)}
                         fullWidth>
                {props.classList.map((each, idx) => (
                  <MenuItem key={each.title} value={idx}>
                    {each.title}
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
    </>
  );
}

//TODO: Use TextField, DialogTitle
//TODO: deploy ways to upload img and retreive it

class ClassBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchSubstring: "",
      classList: [],

      //new class info
      idx: null,
      cls: { title: '', theme: '', tags: ''},

      popup: null,
      admin: true,
    }
  }

  componentDidMount() {
    nodeFetch(`${API_URL}/classes`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => res.json())
      .then(json => this.setState({classList: json.classes}))
      .catch(rej => console.log(rej));
  }

  EditControl() {
    return (
      <span className='btn-group'>
        <Create onClick={() => this.setState(state => ({popup: state.popup === null ? 0 : null}))} />
        <Update onClick={() => this.setState(state => ({popup: state.popup === null ? 1 : null}))} />
        <Delete onClick={() => this.setState(state => ({popup: state.popup === null ? 2 : null}))} />
      </span>
    )
  }

  onSelect(idx) {
    let cls = this.state.classList[idx];
    let tags = cls.tags.join(', ');
    this.setState({idx: idx, cls: {...cls, tags: tags}});
  }

  createClass() {
    let alreadyExist = this.state.classList
      .filter(each => each.title === titlize(this.state.cls.title)).length !== 0;
    if(alreadyExist)
      return; //Might be ask users to override it.

    let title = titlize(this.state.cls.title);
    let tags = this.state.cls.tags.split(',').map(each => each.replace(/^\s+|\s+$/g, ''));
    let newClass = {title: title,
      theme: this.state.cls.theme,
      tags: tags,
      docs: [],
      info: {author: {name: '', email: ''}, level: '', duration: {number: 0, unit: 'None'}, description: ''}};
    nodeFetch(`${API_URL}/classes`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({class: newClass}),
    })
      .then(res => {
        if(res.status === 201) {
          this.setState(state => {
            return {classList: [...state.classList, {...state.cls, tags: tags}], cls: {title: '', theme: '', tags: ''}, popup: null}
          })
        }
      })
      .catch(rej => console.log(rej));
  }

  editClass() {
    let cls = this.state.cls;
    let newClass = {...cls, title: titlize(cls.title),
      tags: cls.tags.split(',').map(each => each.replace(/^\s+|\s+$/g, ''))}
    nodeFetch(`${API_URL}/classes/${this.state.classList[this.state.idx].title}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'class': newClass}),
    })
      .then(res => {
        if (res.status === 201) {
          this.setState(state => {
            state.classList[state.idx] = newClass;
            return {classList: [...state.classList], cls: {title: '', theme: '', tags: ''}, idx: null, popup: null};
          })
        }
      })
      .catch(rej => console.log(rej));
  }

  deleteClass() {
    fetch(`${API_URL}/classes/${this.state.cls.title}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState(state => {
            state.classList.splice(state.idx, 1);
            return {classList: [...state.classList], cls: {title: '', theme: '', tags: ''}, idx: null, popup: null};
          });
        }
      })
      .catch(rej => console.log(rej));
  }

  render() {
    let matchedClasses = this.state.classList.filter(each =>
      each.title.toLowerCase().includes(this.state.searchSubstring.toLowerCase()));
    return (
      <Page>
        <Header left={<div className='title'>Class Board {this.state.admin && this.EditControl()} </div>}
                center={<SearchBox onChange={e => this.setState({searchSubstring: e.target.value})}/>} />
        <CreateClassDialog open={this.state.popup === 0}
                           onClose={() => this.setState({popup: null})}
                           cls={this.state.cls}
                           onChange={cls => this.setState({cls: cls})}
                           onSubmit={() => this.createClass()} />
        <EditClassDialog open={this.state.popup === 1}
                         onClose={() => this.setState({popup: null})}
                         classList={this.state.classList}
                         cls={this.state.cls}
                         idx={this.state.idx}
                         onSelect={idx => this.onSelect(idx)}
                         onChange={cls => this.setState({cls: cls})}
                         onSubmit={() => this.editClass()} />
        <DeleteClassDialog open={this.state.popup === 2}
                           onClose={() => this.setState({popup: null})}
                           classList={this.state.classList}
                           idx={this.state.idx}
                           cls={this.state.cls}
                           onSelect={idx => this.onSelect(idx)}
                           onSubmit={() => this.deleteClass()} />

        <div className='classboard'>
          <ClassList classList={matchedClasses}/>
        </div>
      </Page>
    )
  }

}

export default ClassBoard;


