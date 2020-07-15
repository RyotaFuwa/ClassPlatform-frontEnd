import React, {Component} from 'react';
import NotFound from "../NotFound/NotFound";
import titlize from 'titlize';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import SearchBox from "../../components/SearchBox/SearchBox";

class ClassRoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.match.params.class ? titlize(props.match.params.class) : '',
      htmlBlocks: [], // {title, relative link to the HTMLBlock}
      currentPage: 'https://sourceshare2218.github.io/codingcamp2020/day1.html',
      sidebar: [], // elem: {title: <string>, numOfChildren: <int>} numOfChildren represents # of elements that belong to it from that idx.
      candidateIdxes: [],
    }
  }

  componentDidMount() {
    // load class info
    // load htmlBlocks
    // get sidebar
  }

  renderSidebar() {
    // sidebar is nested lists of Link
    // nest elements if numOfChildren !== 0 when nesting, attaching the outermost page link to the front of each children's title
    // also highlight title if the candidateIdxes is true.
    // logic depends on the order of the list so don't mess up with it.
  }

  renderPage() {
    return (
      <div />
  )
  }

  renderClass() {
    return (
      <div className='page-normal'>
        <NavBar/>
        <div className='page-normal-main classroom'>
          <div className='classroom-header' style={{backgroundColor: 'dimgray'}}>
            <div className='classroom-title'>{this.state.title}</div>
            <div className='classroom-info'>
              <div className='border-basic' />
            </div>
          </div>
          <div className='classroom-sidebar'>
            <SearchBox placeholder='Keyword...' onChange={(e) => {
              let candidates = [];
              this.state.sidebar.forEach((each, idx) => {
                if(each.title.toLowerCase().contains(e.target.value.toLowerCase()))
                  candidates.push(idx);
              })
            }}/>
            {this.renderSidebar()}
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
        {this.renderClass()}
        <button onClick={() => this.getString()}>get String</button>
      </div>
    }
  }
}

export default ClassRoomPage;