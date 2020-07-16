import React, {Component} from 'react';
import NotFound from "../NotFound/NotFound";
import titlize from 'titlize';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import SearchBox from "../../components/SearchBox/SearchBox";
import PageBlob from "../../components/PageBlock/PageBlob";
import Separator from "../../components/PageBlock/Separator";

const API_URL = '';

const EditTag = props => {
  return (
    <div>
      <span onClick={() => {props.createTxtBlob()}}>
        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-card-text" fill="dodgerblue"
             xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd"
                d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
          <path fillRule="evenodd"
                d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </span> &nbsp;
      <span onClick={() => {props.createCodeBlob()}}>
      <svg width="1.5em" height="2em" viewBox="0 0 16 16" className="bi bi-code-slash" fill="green"
           xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd"
              d="M4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0zm-.999-3.124a.5.5 0 0 1 .33.625l-4 13a.5.5 0 0 1-.955-.294l4-13a.5.5 0 0 1 .625-.33z"/>
      </svg>
      </span> &nbsp;
      <span onClick={() => {props.createImgBlob()}}>
      <svg width="1.5em" height="2em" viewBox="0 0 16 16" className="bi bi-card-image" fill="orange"
           xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd"
              d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
        <path
          d="M10.648 7.646a.5.5 0 0 1 .577-.093L15.002 9.5V13h-14v-1l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71z"/>
        <path fillRule="evenodd" d="M4.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
      </svg>
      </span> &nbsp;
    </div>
  )
}

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blobs: [],
    };
  }

  componentDidMount() {
    /*
    fetch(`${this.props.uri}`)
      .then(res => res.json())
      .then(json => this.setState({blobs: json.blobs}))
    */
    let blobs = []
    for(let i=0; i < 10; i++) {
      blobs.push({type: 'txt', name:`${i+1}`, txt: `hello world${i+1}`});
    }
    blobs.push({type: 't_code', name: '11', language: 'javascript',  code: 'console.log("hello");\n' +
        'for(let i=0; i<10; i++) {\n' +
        ' console.log(`Hello World ${i}`);\n' +
        '}'})
    this.setState({blobs: blobs});
  }

  deleteBlobAt(idx) {
    this.setState(state => {state.blobs.splice(idx, 1); return {blobs: [...state.blobs]}})
  }

  updateBlobAt(idx, newBlob) {
    this.setState(state => {state.blobs[idx] = newBlob; return {blobs: [...state.blobs]}})
  }

  renderContent() {
    let blobs = [];
    this.state.blobs.forEach((each, idx) => {
      blobs.push(<PageBlob key={`${each.name}_${idx}`} blob={each}
                           admin={this.props.admin} onDelete={() => this.deleteBlobAt(idx)}
                           onUpdate={newBlob => this.updateBlobAt(idx, newBlob)}/>)
      if(this.props.admin)
        blobs.push(<Separator key={idx}/>)
    })
    return blobs;
  }

  render() {
    return (
      <div>
        {this.props.admin && <EditTag />}
        {this.renderContent()}
      </div>
    )
  }
}

const SideBar = props => {
  return (
    <div>
      <SearchBox placeholder='Keyword...' onChange={(e) => this.search(e.target.value.toLowerCase())} />
      <div className='sidebar'>
      {props.pages.map((each, idx) =>
        <div key={each.name} className='sidebar-col' style={{fontFamily: props.theme.fontFamily}}>
          {each.name}
        </div>)}
      </div>
    </div>
  )
}

class ClassRoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // class info
      title: props.match.params.class ? titlize(props.match.params.class) : '',
      theme: {fontFamily: "Tsukushi A Round Gothic", backgroundColor: 'midnightblue', color: 'white'},
      info: null,
      pages: [{name: 'Day1', page: null}], //[{name: <string>, page: <list>}, page: [pageBlock...], pageBlock: {type, name, <dependent on type...>}

      current: 0,
      candidateIdxes: [], //search result

      admin: false,
    }
  }

  componentDidMount() {
    //get class
    /*
    fetch(`${API_URL}/${this.state.title}`)
      .then(res => res.json())
      .then(json => this.setState({...json}))
      .catch(rej => console.log(rej))

     */
    //test
    let pages = []
    for(let i=0; i < 10; i++) {
      pages.push({name: `Day${i+1}`, page: null});
    }
    this.setState({pages: pages})
  }

  renderPage() {
    if(this.state.pages.length > 0)
      return <Page page={this.state.pages[this.state.current]} admin={this.state.admin}/>;
    else
      return <div>Page Not Found</div>
  }

  renderClass() {
    return (
      <div className='page-normal'>
        <NavBar/>
        <div className='page-normal-main classroom'>
          <div className='classroom-header' style={this.state.theme}>
            <div className='classroom-title'>{this.state.title}</div>
            <div className='classroom-info'>
                Info Here
            </div>
          </div>
          <div className='classroom-sidebar'>
            <SideBar pages={this.state.pages} current={this.state.current} theme={this.state.theme}/>
          </div>
          <div className='classroom-page'>
            <div className='title'>{this.state.pages[this.state.current].name}</div>
            {this.renderPage()}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  render() {
    if(!this.state.title) {
      return <NotFound />
    }
    else {
      return <div>
        {this.renderClass()}
      </div>
    }
  }
}

export default ClassRoomPage;