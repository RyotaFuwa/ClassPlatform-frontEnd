import React, {Component} from "react";
import {connect} from 'react-redux';
import ClassList from "../../components/ClassList/ClassList";
import SearchBox from "../../components/SearchBox/SearchBox";
import {Create, Delete, Edit, Update, XSquare} from "../../icons";
import {Header, Page} from "../../components/Page/Page";
import titlize from "titlize";
import "../ClassRoom/ClassRoom.css";

import {
  getAllClasses,
  createClass,
  updateClass,
  createChat,
  deleteClass
} from '../../firebase/firebase.firestore.classes';
import {uploadImageAt} from "../../firebase/firebase.storage.images";
import {Dialogs} from "../../components/Primitives/Primitives";
import {CreateClassDialog} from "./components/Dialogs/CreateClassDialog";
import {EditClassDialog} from "./components/Dialogs/EditClassDialog";
import {DeleteClassDialog} from "./components/Dialogs/DeleteClassDialog";


const DialogManager = props => {
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

      dialog: null,
    }
  }

  async componentDidMount() {
    try {
      const querySnapshot = await getAllClasses();
      let classList = querySnapshot.docs.map(doc => ({...doc.data(), classId: doc.id}));
      if (!this.props.currentUser.admin) {
        classList = classList.filter(cls => cls.active);
      }
      this.setState({classList: classList});
    }
    catch(err) {
      alert("Failed to load classes");
    }
  }

  handleSelect(idx) {
    let {name, tags, theme, imageUrl} = this.state.classList[idx];
    this.setState({
      selectedIdx: idx,
      name: name,
      tags: tags,
      imageUrl: imageUrl,
      theme: theme
    });
  }

  async createClass() {
    // cloud firestore
    const {name, theme, tags} = this.state;
    if(!name) {
      alert('a class needs its name.');
      return;
    }
    const titlizedName = titlize(name);
    let sameNameClassAlreadyExists = this.state.classList.filter(each => each.name === titlizedName).length > 0
    if(sameNameClassAlreadyExists) {
      alert('a class with the same name already exists.');
      return;
    }

    const newClass = {
      name: titlizedName,
      docs: [],
      tags: tags,
      theme: theme,
      author: this.props.currentUser,
      level: 0,
      duration: {number: 0, unit: 'None'},
      imageUrl: '',
      active: true,
      createdAt: new Date(),
    };

    try {
      const chatRef = await createChat();
      Object.assign(newClass,  {chatId: chatRef.id})
      const documentRef = await createClass(newClass);
      this.setState(state => ({
        classList: [...state.classList, {...newClass, classId: documentRef.id}],
        name: '',
        tags: '',
        imageUrl: '',
        theme: 'default',
        dialog: null
      }))
    }
    catch(err) {
      alert(`Failed to create a new class: ${err}`);
    }
  }

  async updateClass() {
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
    const {name, tags, theme, imageUrl} = this.state;
    const titlizedName = titlize(name);
    const updatingFields = {name: titlizedName, tags: tags, theme: theme, imageUrl: imageUrl};
    try {
      await updateClass(classId, updatingFields);
      this.setState(state => {
        Object.assign(state.classList[state.selectedIdx], updatingFields);
        return {
          classList: [...state.classList],
          name: '',
          tags: '',
          theme: 'default',
          imageUrl: '',
          selectedIdx: null,
          dialog: null,
        };
      })
    }
    catch(err) {
      alert(`Failed to update a class: ${err}`);
    }
  }

  async uploadImage(imageFile) {
    if(this.state.name === '') return;
    try {
      const snapshot = await uploadImageAt(this.state.name, imageFile);
      const url = await snapshot.ref.getDownloadURL();
      this.setState({imageUrl: url});
    }
    catch(err) {
      alert('Failed to upload a image');
      console.log(err);
    }
  }

  async deleteClass() {
    //firebase
    const { classId, active } = this.state.classList[this.state.selectedIdx];
    if(active) {
      try {
        await updateClass(classId, {active: false});
        this.setState(state => {
          Object.assign(state.classList[state.selectedIdx], {active: false});
          return {
            classList: [...state.classList],
            selectedIdx: null,
            dialog: null,
          }
        })
      } catch (err) {
        console.log(err);
        alert('Failed to delete(inactivate) the class');
      }
    }
    else {
      try {
        await deleteClass(classId);
        this.setState(state => {
          state.classList.splice(this.state.selectedIdx, 1);
          return {
            classList: [...state.classList],
            selectedIdx: null,
            dialog: null,
          }
        })
      } catch (err) {
        console.log(err);
        alert('Failed to hard-delete the class');
      }
    }
  }

  render() {
    const {classList, name, tags, theme, imageUrl, selectedIdx, dialog, searchSubstring} = this.state;
    const editingClass = {name, tags, theme, imageUrl};
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
                <DialogManager handleClick={idx => this.setState(state => ({dialog: state.dialog === null ? idx : null}))} />
                }
              </div>
            )}
            center={
              <SearchBox placeholder='Search Class' onChange={e => this.setState({searchSubstring: e.target.value})}/>
            }
          />
          <ClassList classList={matchedClasses}/>
        </Page>

        <Dialogs>
          <CreateClassDialog
            open={dialog === 0}
            editingClass={editingClass}
            onChange={updateFields => this.setState(updateFields)}
            onClose={() => this.setState({dialog: null, name: '', tags: '', theme: ''})}
            onSubmit={() => this.createClass()}
          />
          <EditClassDialog
            open={dialog === 1}
            classList={classList}
            selectedIdx={selectedIdx}
            editingClass={editingClass}
            handleDrop={imageFile => this.uploadImage(imageFile)}
            onSelect={idx => this.handleSelect(idx)}
            onChange={updateFields => this.setState(updateFields)}
            onClose={() => this.setState({dialog: null, selectedIdx: null, name: '', tags: '', theme: ''})}
            onSubmit={() => this.updateClass()}
          />
          <DeleteClassDialog
            open={dialog === 2}
            classList={classList}
            selectedIdx={selectedIdx}
            editingClass={editingClass}
            onSelect={idx => this.setState({selectedIdx: idx})}
            onClose={() => this.setState({dialog: null, selectedIdx: null})}
            onSubmit={() => this.deleteClass()}
          />
        </Dialogs>
      </>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(ClassBoard);


