import React, {Component} from 'react';
import NotFound from "../NotFound/NotFound";
import titlize from 'titlize';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CollapibleBlock from "../../components/CollapibleBlock/CollapibleBlock";

class ClassRoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.match.params.class ? titlize(props.match.params.class) : '',
    }
  }

  componentDidMount() {
    // load class
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
            <div className='w-100, h-100 border-basic' />
          </div>
          <div className='classroom-sidebar' />
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
      return this.renderClass();
    }
  }
}

export default ClassRoomPage;