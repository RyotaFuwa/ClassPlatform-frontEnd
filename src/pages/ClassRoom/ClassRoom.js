import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Page} from "../../components/Page/Page";
import Doc from "../../components/Doc/Doc";

import SideBar from "./components/SideBar/SideBar";
import Info from "./components/Info/Info";
import Banner from "./components/Primitives/Banner";
import Title from './components/Primitives/Title'
import {mapDispatchToProps, mapStateToProps, THEME} from "./consts";
import {getClassByName} from "../../firebase/firebase.firestore.classes";


// components.
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

  render() {
    if(!this.props.currentClass && this.state.loading) {
      return (
        <Page>
          <div className='loading w-100 h-100 text-center'>Loading Page...</div>
        </Page>
      )
    }
    const {name, theme, docs, currentDocIdx} = this.props.currentClass;
    const doc = docs[currentDocIdx];
    return (
      <Page>
        <div className='classroom' style={{fontFamily: THEME.get(theme).fontFamily}}>
          <Banner {...THEME.get(theme)}>
            <Title>{name}</Title>
            <Info />
          </Banner>
          <SideBar {...THEME.get(theme)} />
          <Doc key={doc ? doc.name : ''} doc={doc}/>
        </div>
      </Page>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ClassRoom)