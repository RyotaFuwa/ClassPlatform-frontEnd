import React, {Component} from 'react';
import './ScrollBar.css';

class ScrollBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      length: props.length,
      width: props.width ? props.width : '15px',
      direction: props.direction,
      progressStyle: null,
      backgroundStyle: null,
    }
  }

  componentDidMount() {
    window.onscroll = this.onScroll;
    if (this.state.direction === 'x') {
      this.setState(state => ({
        progressStyle: {width: 0, height: state.width},
        backgroundStyle: {width: state.length, height: state.width},
      }));
    } else if (this.state.direction === 'y') {
      this.setState(state => ({
        progressStyle: {width: state.width, height: 0},
        backgroundStyle: {width: state.width, height: state.length}
      }));
    }
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  onScroll = () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    this.setState(state => {
      if (state.direction === 'x') {
        return {progressStyle: {width: scrolled + '%', height: state.width}}
      } else if (state.direction === 'y') {
        return {progressStyle: {width: state.width, height: scrolled + '%'}}
      }
    });
  }

  render() {
    return (
      <div className="scrollbar-background" style={this.state.backgroundStyle}>
        <div className="scrollbar-progress" style={this.state.progressStyle}/>
      </div>
    )
  }
}

export default ScrollBar;
