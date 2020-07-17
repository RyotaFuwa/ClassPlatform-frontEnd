import React, {Component} from 'react';
import NotFound from "../NotFound/NotFound";
import titlize from 'titlize';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import SearchBox from "../../components/SearchBox/SearchBox";
import Blob from "../../components/PageBlock/Blob";
import Separator from "../../components/PageBlock/Separator";

const API_URL = '';
const admin = true;

//TODO: user authentification, admin, editing deployment with redux
//TODO: sidebar implementation
//TODO: data structure of page and api call



class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blobs: [],

      focusIdx: null,
    };
  }

  componentDidMount() {
    /*
    fetch(`${this.props.uri}`)
      .then(res => res.json())
      .then(json => this.setState({blobs: json.blobs}))
    */
    let blobs = []
    for (let i = 0; i < 10; i++) {
      blobs.push({
        type: 'txt', title: `${i + 1}`, noTitle: true, txt: `algorithm is 
kind of instructions that computer can execute and usually do some tasks.
can you understand what i mean by this?`
      });
    }
    blobs.push({
      type: 'code', title: '11', noTitle: false, language: 'javascript', code: 'console.log("hello");\n' +
        'for(let i=0; i<10; i++) {\n' +
        ' console.log(`Hello World ${i}`);\n' +
        '}'
    })
    this.setState({blobs: blobs});
  }

  deleteBlobAt(idx) {
    this.setState(state => {
      state.blobs.splice(idx, 1);
      return {blobs: [...state.blobs]}
    })
  }

  updateBlobAt(idx, newBlob) {
    this.setState(state => {
      state.blobs[idx] = newBlob;
      return {blobs: [...state.blobs]}
    })
  }

  move(to) {
    console.log(`${this.state.focusIdx} -> ${to}`)
    let isReady = this.state.focusIdx !== null && this.state.focusIdx >= 0 && this.state.focusIdx < this.state.blobs.length
    let noChange = this.state.focusIdx === to || this.state.focusIdx + 1 === to;
    if(isReady && !noChange) {
      this.setState(state => {
        let [e] = state.blobs.splice(this.state.focusIdx, 1);
        if(this.state.focusIdx < to)
          to -= 1;
        state.blobs.splice(to, 0, e);
        return {blobs: [...state.blobs], focusIdx: null}
      })
    }
  }

  renderBlobs() {
    let blobs = [];
    if (this.props.editing)
      blobs.push(<Separator key={0} onDrop={() => this.move(0)}/>)
    this.state.blobs.forEach((each, idx) => {
      blobs.push(<Blob key={`${each.title}_${idx}`}
                       onDragStart={() => this.setState({focusIdx: idx})}
                       blob={each} // blob must have {type, title}
                       editing={this.props.editing}
                       onDelete={() => this.deleteBlobAt(idx)}
                       onUpdate={newBlob => this.updateBlobAt(idx, newBlob)}/>)
      if (this.props.editing)
        blobs.push(<Separator key={idx + 1} onDrop={() => this.move(idx + 1)}/>)
    })
    return blobs;
  }

  EditTag() {
    return (
      <span>
      <span className='create-txt m-2' onClick={() => this.setState(state => ({
        blobs: [...state.blobs, {
          name: '',
          type: 'txt',
          title: '',
          txt: ''
        }]
      }))}>
        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-card-text edit-icon" fill="dodgerblue"
             xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd"
                d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
          <path fillRule="evenodd"
                d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </span>
      <span className='create-code m-2' onClick={() => this.setState(state => ({
        blobs: [...state.blobs, {
          name: '',
          type: 'code',
          title: '',
          code: ''
        }]
      }))}>
      <svg width="1.5em" height="2em" viewBox="0 0 16 16" className="bi bi-code-slash edit-icon" fill="green"
           xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd"
              d="M4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0zm-.999-3.124a.5.5 0 0 1 .33.625l-4 13a.5.5 0 0 1-.955-.294l4-13a.5.5 0 0 1 .625-.33z"/>
      </svg>
      </span>
      <span className='create-img m-2' onClick={() => this.setState(state => ({
        blobs: [...state.blobs, {
          name: '',
          type: 'img',
          title: '',
          img: ''
        }]
      }))}>
      <svg width="1.5em" height="2em" viewBox="0 0 16 16" className="bi bi-card-image edit-icon" fill="orange"
           xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd"
              d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
        <path
          d="M10.648 7.646a.5.5 0 0 1 .577-.093L15.002 9.5V13h-14v-1l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71z"/>
        <path fillRule="evenodd" d="M4.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
      </svg>
      </span>
    </span>
    )
  }

  render() {
    if (this.props.editing)
      return (
        <div>
          {this.renderBlobs()}
          <div className='m-3'>{this.EditTag()}</div>
        </div>
      )
    else
      return (
        <div className='page-blobs'>
          {this.renderBlobs()}
        </div>
      )
  }
}

const SideBar = props => {
  return (
    <div>
      <SearchBox placeholder='Keyword...' onChange={(e) => this.search(e.target.value.toLowerCase())} />
      <div className='sidebar'>
      {props.pages.map(each =>
        <div key={each.title} className='sidebar-col' style={{fontFamily: props.theme.fontFamily}}>
          <div onClick={(e) => props.linkTo(e.target.innerText)}>{each.title}</div>
          {each.page !== null &&
          each.page.props.blobs
            .filter(each => each.title !== '')
            .map(each => <div>{each.title}</div>)}
        </div>
      )}
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
      pages: [{title: 'Day1', page: null}], //[{title: <string>, page: <list>}, page: [pageBlock...], pageBlock: {type, title, <dependent on type...>}

      editing: admin,

      current: 0,
      candidateIdxes: [], //search result
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
      pages.push({title: `Day${i+1}`, page: null});
    }
    this.setState({pages: pages})
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

  linkTo(_id) {
    console.log(_id);
    //setState({current: page the title is pointing to
    //jump to the blob of title
  }

  renderPage() {
    if(this.state.pages.length > 0)
      return (
          <div>
            <div className='class-title' style={{fontFamily: this.state.theme.fontFamily}}>
              {this.state.pages[this.state.current].title}
              {admin &&
                <span className='m-3' onClick={() => this.setState(state => ({editing: !state.editing}))}>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-eyeglasses edit-icon"
                       fill={this.state.editing ? "darkgoldenrod" : "lightgray"} xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M4 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fillRule="evenodd"
                          d="M8 7a1 1 0 0 0-1 1H6a2 2 0 1 1 4 0H9a1 1 0 0 0-1-1zM0 8a.5.5 0 0 1 .5-.5h1v1h-1A.5.5 0 0 1 0 8zm15.5.5h-1v-1h1a.5.5 0 0 1 0 1z"/>
                  </svg>
                </span>
              }
            </div>
            <Page page={this.state.pages[this.state.current]} editing={this.state.editing}/>
          </div>
      )
    else
      return <div>Page Not Found</div>
  }

  renderClassRoom() {
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
            <SideBar pages={this.state.pages} current={this.state.current} theme={this.state.theme} linkTo={this.linkTo} />
          </div>
          <div className='classroom-page'>
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
        {this.renderClassRoom()}
      </div>
    }
  }
}

export default ClassRoomPage;