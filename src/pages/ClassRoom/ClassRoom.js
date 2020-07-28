import React, {Component, Fragment, useState} from 'react';
import titlize from 'titlize';
import NotFound from "../../components/NotFound/NotFound";
import {Page} from "../../components/Page/Page";
import SearchBox from "../../components/SearchBox/SearchBox";
import Separator from "../../components/Blob/Separator";
import {VerticalGrip, Edit, XSquare, Update, Doc as DocIcon} from "../../icons";
import Doc from "../../components/Doc/Doc";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem";

const nodeFetch = require('node-fetch');
const API_URL = 'http://localhost:3001/api';
const admin = true;
const CLASS_LEVEL = ['None', 'Easy', 'Intermediate', 'Advanced', 'Research'];
const TIME_UNIT = ['None', 'min', 'hour', 'day', 'week', 'month', 'year'];
const THEME = new Map([['default', {fontFamily: "Tsukushi A Round Gothic", backgroundColor: 'darkblue', color: 'white'}], ['modern', {}], ['classic', {}], ['mono', {}],]);

//HACK: on backend proxy, set up in-memory db to alleviate load of doc content update to main db.

//TODO: user authentification, admin, editing deployment with redux
//TODO: data structure of page and api call


//Info
const EditDialog = props => {
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState(props.info);
  return (
    <>
      <Edit onClick={() => {setInfo(props.info); setOpen(true)}} />
      <Dialog fullWidth maxWidth='sm'  open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Info of Class</DialogTitle>
        <DialogContent>
          <div className='mb-5'>
            Author: &nbsp;
            <div className='ml-4'>
              <TextField margin="dense" label="Name" type="name"
                         value={info.author.name}
                         onChange={e => setInfo({...info, author: {...info.author, name: e.target.value}})}
                         fullWidth/>
              <TextField margin="dense" label="Email" type="email"
                         value={info.author.email}
                         onChange={e => setInfo({...info, author: {...info.author, email: e.target.value}})}
                         fullWidth autoFocus/>
            </div>
          </div>
          <div className='mb-5'>
            Level: &nbsp;
            <div className='m-4'>
              <TextField select label="Level"
                         value={info.level}
                         onChange={e => setInfo({...info, level: e.target.value})}
                         fullWidth>
                {CLASS_LEVEL.map((each) => (
                  <MenuItem key={each} value={each}>
                    {each}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className='mb-5'>
            Duration: &nbsp;
            <div className='ml-4 infopanel-duration'>
              <TextField margin="none" label='Duration' type="number"
                         value={info.duration.number}
                         onChange={e => setInfo({...info, duration: {...info.duration, number: e.target.value}})}
                         autoFocus/>
              <TextField select label="Unit"
                         value={info.duration.unit}
                         onChange={e => setInfo({...info, duration: {...info.duration, unit: e.target.value}})}>
                {TIME_UNIT.map((each) => (
                  <MenuItem key={each} value={each}>
                    {each}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className='mb-5'>
            Description: &nbsp;
            <TextField autoFocus margin='dense' type='textarea'
                       value={info.description}
                       onChange={e => setInfo({...info, description: e.target.value})}
                       rows={4} multiline fullWidth/>
          </div>
        </DialogContent>
        <DialogActions>
          <Update onClick={() => {props.onUpdate(info); setOpen(false);}} />
          <XSquare onClick={() => setOpen(false)}/>
        </DialogActions>
      </Dialog>
    </>
  );
}

const ClassInfo = props => {
  const InfoPanel = () =>  (
    <div className='infopanel'>
      <div>
        <b>Author</b>
        <div>
          {props.info.author.name} &nbsp; &nbsp; [ {props.info.author.email} ]
        </div>
      </div>
      <div>
        <b>Level</b>
        <div>
          {props.info.level}
        </div>
      </div>
      <div>
        <b>Duration</b>
        <div>
          {props.info.duration.number} {props.info.duration.unit}
        </div>
      </div>
      <div>
        <b>Description</b>
        <p className='text-left'>
          {props.info.description}
        </p>
      </div>
    </div>
  )

  return (
    <div style={{fontFamily: props.style.fontFamily}}>
      <InfoPanel />
      <EditDialog info={props.info} onUpdate={props.onUpdate}/>
    </div>
  )
}

//Sidebar
const SideBarCol = props => {
  const [draggable, setDraggable] = useState(false)
  const [editable, setEditable] = useState(false);
  let titleElement = editable ?
    <input className='w-100 h-100' value={props.title} onChange={e => props.onChange(e.target.value)} autoFocus/> :
    <div className='mr-5 sidebar-title scrollable' onClick={props.setCurrent}>{props.title}</div>;
  return (
    <div key={props.title} className='sidebar-col' draggable={draggable}
         onDragStart={props.onDragStart}
         onDragEnd={() => setDraggable(false)}
         style={{fontWeight: props.current ? 'bolder' : null}}>
      {titleElement}
      {admin &&
      <div className='sidebar-ops'>
        <span className='m-1'>
          <VerticalGrip onMouseDown={() => setDraggable(true)}/>
        </span>
        <span className='m-1'>
          <Edit onClick={() => {
            if(editable) {
              props.onUpdate();
            }
            setEditable(!editable)
          }}/>
        </span>
        <span className='m-1'>
          <XSquare onClick={props.onDelete} />
        </span>
      </div>
      }
    </div>
  )
}

const SideBar = props => {
  return (
    <div>
      <div className='sidebar' style={{fontFamily: props.style.fontFamily}}>
        {admin && <Separator onDrop={() => props.move(0)}/>}
        {props.docs.map((each, idx) => (
          <Fragment key={idx}>
            <SideBarCol title={each.title}
                        current={idx === props.current}
                        onChange={title => props.setTitle(idx, title)}
                        onUpdate={props.onUpdate}
                        onDragStart={() => props.setFocusIdx(idx)}
                        onDelete={() => props.deleteDoc(idx)}
                        setCurrent={() => props.setCurrent(idx)} />

            {admin && <Separator onDrop={() => props.move(idx + 1)}/>}
          </Fragment>
          ))
        }
        {admin && (
          <span>
            <DocIcon onClick={props.createDoc}/>
          </span>
        )}
      </div>
    </div>
  )
}


class ClassRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // class info
      title: props.match.params.class ? titlize(props.match.params.class) : '',
      info: {author: {name: '', email: ''}, level: 0, duration: {number: 0, unit: 'None'}, description: ''},
      docs: [],
      theme: 'default',

      current: 0,
      focusIdx: null,

      docsCache: new Map(),
    }
  }

  componentWillMount() {
    nodeFetch(`${API_URL}/classes/${this.state.title}`)
      .then(res => res.json())
      .then(json => this.setState({...json}))
      .catch(rej => console.log(rej))
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //render page
    /*
    if(current page in cache)
      return current page
    else
      render by api call
     */
  }

  setTitle(idx, title) {
    this.setState(state => {
      state.docs[idx] = {...state.docs[idx], title: title};
      return {docs: [...state.docs]}})
  }

  move(to) {
    console.log(`${this.state.focusIdx} -> ${to}`)
    let isReady = this.state.focusIdx !== null && this.state.focusIdx >= 0 && this.state.focusIdx < this.state.docs.length;
    let noChange = this.state.focusIdx === to || this.state.focusIdx + 1 === to;
    if(isReady && !noChange) {
      this.setState(state => {
        let [e] = state.docs.splice(this.state.focusIdx, 1);
        if(this.state.focusIdx < to)
          to -= 1;
        state.docs.splice(to, 0, e);
        return {docs: [...state.docs], focusIdx: null}
      }, () => {
        this.updateClass({docs: this.state.docs})
          .then(res => console.log('succeeded'))
          .catch(rej => console.log('failed'))
      })
    }
  }

  updateClass(json) {
    return nodeFetch(`${API_URL}/classes/${this.state.title}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'class': {...json}}),
    });
  }

  updateInfo(info) {
    this.updateClass({info: info})
        .then(res => {
          if(res.status === 201)
            this.printSuccess('Info Updated');
          else
            this.printFail('Update Failed')
        })
      .catch(() => this.printFail('Update Failed'))
  }

  createDoc() {
    nodeFetch(`${API_URL}/classes/${this.state.title}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({doc: {blobs: []}}),
    })
      .then(res => res.json())
      .then(json => {
        let docs = [...this.state.docs, {title: 'Untitled', _id: json._id}];
        this.updateClass({docs: docs})
          .then(res => {
            if(res.status === 201)
              this.setState({docs: docs})
          })
          .catch(() => console.log('failed'))
      })
      .catch(() => console.log('failed'))
  }

  deleteDoc(idx) {
    nodeFetch(`${API_URL}/classes/${this.state.title}/${this.state.docs[idx]._id}`, {
      method: 'Delete',
      headers: {'Content-Type': 'application/json'},
    })
      .then(res => {
        if(res.status === 200) {
          let docs = [...this.state.docs];
          docs.splice(idx, 1);
          this.updateClass({docs: docs})
            .then(res => {
              if(res.status === 201)
                this.setState({docs: docs})
            })
            .catch(() => console.log('failed'))
        }
      })
      .catch(() => console.log('failed'))
  }

  renderPage() {
    if(this.state.docs.length === 0)
      return <NotFound inline />;
    let docId = this.state.docs[this.state.current]._id;
    if(this.state.docsCache.has(docId)) {
      return this.state.docsCache.get(docId);
    }
    this.state.docsCache.set(docId, (
      <Doc key={docId}
           classTitle={this.state.title}
           doc={this.state.docs[this.state.current]}
           style={THEME.get(this.state.theme)}/>
    ));
    return this.state.docsCache.get(docId);
  }

  render() {
    return (
      <Page>
        <div className='classroom'>
          <div className='classroom-header' style={THEME.get(this.state.theme)}>
            <div className='classroom-title'>{this.state.title}</div>
            <div className='classroom-info'>
              <ClassInfo style={THEME.get(this.state.theme)}
                         info={this.state.info}
                         onUpdate={info => this.updateInfo(info)} />
            </div>
          </div>
          <div className='classroom-sidebar'>
            <SideBar docs={this.state.docs}
                     style={THEME.get(this.state.theme)}
                     current={this.state.current}
                     move={idx => this.move(idx)}
                     createDoc={() => this.createDoc()}
                     deleteDoc={idx => this.deleteDoc(idx)}
                     onUpdate={() => this.updateClass({docs: this.state.docs}).then(() => this.printSuccess('Updated')).catch(() => this.printFail('Update Failed'))}
                     setTitle={(idx, title) => this.setTitle(idx, title)}
                     setCurrent={idx => this.setState({current: idx})}
                     setFocusIdx={idx => this.setState({focusIdx: idx})} />
          </div>
          <div className='classroom-page'>
            {this.renderPage()}
          </div>
        </div>
      </Page>
    )
  }
}

export default ClassRoom;