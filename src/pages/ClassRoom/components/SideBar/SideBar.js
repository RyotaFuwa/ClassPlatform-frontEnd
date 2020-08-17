import {connect} from "react-redux";
import React, {Fragment, useState} from "react";
import {createCleanDoc, deleteCleanDoc, updateClass} from "../../../../firebase/firebase.firestore.classes";
import Separator from "../../../../components/Blob/Separator";
import {Doc as DocIcon, Edit, VerticalGrip, XSquare} from "../../../../icons";
import {mapDispatchToProps, mapStateToProps} from "../../consts";
import './SideBar.css';


// components.
const SideBarCol = props => {
  const [draggable, setDraggable] = useState(false)
  const [editing, setEditing] = useState(false);
  const [editingName, setEditingName] = useState(props.name);
  let titleElement = editing ?
    <input className='w-100 h-100' value={editingName} onChange={e => setEditingName(e.target.value)} autoFocus/> :
    <div className='title scrollable' onClick={props.selectDoc} >{props.name}</div>;

  return (
    <div
      className='sidebar-col'
      draggable={draggable}
      onDragStart={props.onDragStart}
      onDragEnd={() => setDraggable(false)}
      style={{
        fontWeight: props.currentDoc ? 'bolder' : null,
        textDecoration: props.currentDoc ? 'underline' : null,
      }}
    >
      {titleElement}
      {props.admin && (
        <div className='ops'>
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
    const updatingFields = {currentDocIdx: idx};
    props.updateCurrentClass(updatingFields);
  }

  const createDocAtEnd = async () => {
    try {
      const documentRef = await createCleanDoc();
      docs.push({name: 'Untitled', cleanDocId: documentRef.id});
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
    const [deletingDoc] = docs.splice(idx, 1);
    const updatingFields = {docs};
    try {
      await deleteCleanDoc(deletingDoc.cleanDocId);
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
    <div className='sidebar' style={{fontFamily: props.fontFamily}}>
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

export default SideBar;
