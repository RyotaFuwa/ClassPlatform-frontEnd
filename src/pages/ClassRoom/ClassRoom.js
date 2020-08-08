import React, {Component, Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import NotFound from "../../components/NotFound/NotFound";
import {Page} from "../../components/Page/Page";
import Separator from "../../components/Blob/Separator";
import {VerticalGrip, Edit, XSquare, Update, Doc as DocIcon} from "../../icons";
import Doc from "../../components/Doc/Doc";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem";
import {createDoc, getClassByName, updateClass} from "../../firebase/firebase.firestore.classes";
import {setCurrentClass, updateCurrentClass} from "../../redux/class/class.actions";

const CLASS_LEVEL = ['None', 'Easy', 'Intermediate', 'Advanced', 'Research'];
const TIME_UNIT = ['None', 'min', 'hour', 'day', 'week', 'month', 'year'];
const THEME = new Map([['default', {fontFamily: "Varela Round", backgroundColor: 'darkblue', color: 'white'}], ['modern', {}], ['classic', {}], ['mono', {}],]);


const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentClass: state.class.currentClass,
})

const mapDispatchToProps = dispatch => ({
  setCurrentClass: cls => dispatch(setCurrentClass(cls)),
  updateCurrentClass: updatingFields => dispatch(updateCurrentClass(updatingFields)),
})

//Info
const InfoEditDialog = connect(mapStateToProps, mapDispatchToProps)(props => {
  const admin = props.currentUser && props.currentUser.admin;
  const {author, level, duration, classId} = props.currentClass;

  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState({author, level, duration});

  const updateClassInfo = () => {
    updateClass(classId, info)
      .then(() => {
        props.updateCurrentClass(info);
        setOpen(false);
      })
      .catch(err => {
        alert('Failed to update the class.')
        console.log(err);
      })
  }

  return (
    <>
      {admin &&
      <Edit
        disabled={!admin}
        onClick={() => {
          setInfo({author, level, duration});
          setOpen(true)
        }}
      />
      }
      <Dialog fullWidth maxWidth='sm'  open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Info of Class</DialogTitle>
        <DialogContent>
          <div className='mb-5'>
            Author: &nbsp;
            <div className='ml-4'>
              <TextField
                margin="dense"
                label="Name"
                type="name"
                value={info.author.displayName}
                disabled
                fullWidth
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                value={info.author.email}
                disabled
                fullWidth
              />
            </div>
          </div>
          <div className='mb-5'>
            Level: &nbsp;
            <div className='m-4'>
              <TextField
                select
                label="Level"
                value={info.level}
                onChange={e => setInfo({...info, level: e.target.value})}
                fullWidth
              >
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
            <div className='ml-4'>
              <TextField
                margin="none"
                label='Duration'
                type="number"
                value={info.duration.number}
                onChange={e => setInfo({...info, duration: {...info.duration, number: e.target.value}})}
                autoFocus
              />
              <span className='m-4' />
              <TextField
                select
                label="Unit"
                value={info.duration.unit}
                onChange={e => setInfo({...info, duration: {...info.duration, unit: e.target.value}})}
              >
                {TIME_UNIT.map((each) => (
                  <MenuItem key={each} value={each}>
                    {each}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Update onClick={() => updateClassInfo()} />
          <XSquare onClick={() => setOpen(false)}/>
        </DialogActions>
      </Dialog>
    </>
  );
})

const Info = connect(mapStateToProps)(props => {
  const {author, level, duration} = props.currentClass;
  return (
    <div className='info'>
      <div>
        <b>Author</b>
        <div>
          {author.displayName} &nbsp; &nbsp; [ {author.email} ]
        </div>
      </div>
      <div>
        <b>Level</b>
        <div>
          {level}
        </div>
      </div>
      <div>
        <b>Duration</b>
        <div>
          {duration.number === 0 ? '' : `${duration.number} ${duration.unit}`}
        </div>
      </div>
      <InfoEditDialog />
    </div>
  )
})

const SideBarCol = props => {
  const [draggable, setDraggable] = useState(false)
  const [editing, setEditing] = useState(false);
  const [editingName, setEditingName] = useState(props.name);

  let titleElement = editing ?
    <input className='w-100 h-100' value={editingName} onChange={e => setEditingName(e.target.value)} autoFocus/> :
    <div className='mr-5 sidebar-title scrollable' onClick={props.selectDoc} >{props.name}</div>;

  return (
    <div
      className='sidebar-col'
      draggable={draggable}
      onDragStart={props.onDragStart}
      onDragEnd={() => setDraggable(false)}
      style={{fontWeight: props.currentDoc ? 'bolder' : null}}
    >
      {titleElement}
      {props.admin && (
        <div className='sidebar-ops'>
          <span className='m-1'>
            <VerticalGrip onMouseDown={() => setDraggable(true)}/>
          </span>
          <span className='m-1'>
            <Edit
              onClick={() => {
                if(editing) {
                  props.updateDocName(editingName);
                }
                setEditing(true);
              }}
            />
          </span>
          <span className='m-1'>
            <XSquare onClick={props.deleteDoc} />
          </span>
        </div>
      )}
    </div>
  )
}

const SideBar = connect(mapStateToProps, mapDispatchToProps)(props => {
  const admin = props.currentUser && props.currentUser.admin;
  const {docs, theme, currentDocIdx, classId} = props.currentClass;

  const [selectedIdx, setSelectedIdx] = useState(null);

  const selectDoc = async idx => {
    try {
      const updatingFields = {currentDocIdx: idx};
      await updateClass(classId, updatingFields);
      props.updateCurrentClass(updatingFields);
    }
    catch(err) {
      console.log(err);
    }
  }

  const createDocAtEnd = async () => {
    try {
      const documentRef = await createDoc(classId, {});
      docs.push({name: 'Untitled', docId: documentRef.id});
      const updatingFields = {docs};
      await updateClass(classId, updatingFields);
      props.updateCurrentClass(updatingFields);
    }
    catch(err) {
      alert('Failed to create a new doc.')
      console.log(err);
    }
  }

  const updateDocNameAt = async (idx, name) => {
    docs[idx].name = name;
    const updatingFields = {docs};
    try {
      await updateClass(classId, updatingFields);
      props.updateCurrentClass(updatingFields);
    }
    catch(err) {
      alert('Failed to rename the doc.')
      console.log(err);
    }
  }

  const deleteDocAt = async idx => {
    docs.splice(idx, 1);
    const updatingFields = {docs};
    try {
      await updateClass(classId, updatingFields);
      props.updateCurrentClass(updatingFields);
    }
    catch(err) {
      alert('Failed to delete the doc.')
      console.log(err);
    }
  }

  const moveDocFromTo = async (from, to) => {
    console.log(`${from} -> ${to}`)
    let isReady = from !== null && from >= 0 && from < docs.length;
    let noChange = from === to || from + 1 === to;
    if(isReady && !noChange) {
      let [e] = docs.splice(from, 1);
      if(from < to) {
        to -= 1;
      }
      docs.splice(to, 0, e);
      try {
        const updatingFields = {docs: docs};
        await updateClass(classId, updatingFields);
        props.updateCurrentClass(updatingFields);
      }
      catch(err) {
        alert('Failed to reorder the docs.')
        console.log(err);
      }
    }
  }

  return (
    <div className='sidebar' style={{fontFamily: THEME.get(theme).fontFamily}}>
      {admin && <Separator onDrop={() => moveDocFromTo(selectedIdx, 0)}/>}
      {docs.map((each, idx) => {
        return (
          <Fragment key={`${each.name}_${idx}`}>
            <SideBarCol
              admin={admin}
              name={each.name}
              currentDoc={idx === currentDocIdx}
              selectDoc={() => selectDoc(idx)}
              updateDocName={name => updateDocNameAt(idx, name)}
              deleteDoc={() => deleteDocAt(idx)}
              onDragStart={() => setSelectedIdx(idx)}
            />
            {admin && <Separator onDrop={() => moveDocFromTo(selectedIdx, idx + 1)}/>}
          </Fragment>
        )
      })}
      {admin && (
        <span>
          <DocIcon onClick={createDocAtEnd}/>
        </span>
      )}
    </div>
  )
})


class ClassRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // class info
      className: props.match && props.match.params.class ? props.match.params.class : '',

      loading: true,
    }
  }

  componentDidMount() {
    let wrongClass = this.state.className && (this.state.className !== this.props.currentClass.name);
    if(wrongClass) {
      getClassByName(this.state.name)
        .then(cls => {
          this.props.setCurrentClass({...cls, currentDocIdx: 0});
        })
        .catch(err => {
        alert('Failed to load the correct class.')
        console.log(err);
        })
    }
  }

  async updateClass(updatingFields) {
    const { classId } = this.props.currentClass;
    try {
      await updateClass(classId, updatingFields);
      this.props.updateCurrentClass(updatingFields);
    }
    catch(err) {
      alert(`Failed to update a class: ${err}`);
    }
  }

  render() {
    if(!this.props.currentClass && this.state.loading) {
      return (
        <Page>
          <div className='loading w-100 h-100 text-center'>Loading Page...</div>
        </Page>
      )
    }
    const {name, theme, docs, currentDocIdx} = this.props.currentClass;
    return (
      <Page>
        <div className='classroom'>
          <div className='classroom-header' style={THEME.get(theme)}>
            <div className='classroom-title'>{name}</div>
            <div className='classroom-info'>
              <Info />
            </div>
          </div>
          <SideBar />
          <div className='classroom-page'>
            {/*<Doc doc={docs[currentDocIdx]} /> */}
            Doc rendered here.
          </div>
        </div>
      </Page>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ClassRoom)