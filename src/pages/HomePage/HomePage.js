import React, {useState} from "react";
import NavBar from "../../components/NavBar/NavBar";
import SpaceBoard from "../../components/GraphicBoard/GraphicBoard";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";
import {Page} from "../../components/Page/Page";
import algorithm from '../../data/algorithm.jpg';
import UnderConstruction from "../../components/UnderConstruction/UnderConstruction";

const Test = props => {
  const [idx, setIdx] = useState(props.idx)
  return (
    <div>{idx} <button onClick={() => setIdx(idx + 1)}>One Step Up</button></div>
  )
}

class TestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      listIdx: [],
    }
  }

  componentDidMount() {
    let listIdx = [];
    let list = [];
    for(let i = 0; i < 10; i++) {
      listIdx.push(i);
      list.push(<Test key={i} idx={i} />)
    }
    this.setState({list: list, listIdx: listIdx});
  }

  render() {
    let out =(this.state.listIdx.map(idx => this.state.list[idx]));
    return <div>
      {out}
      <button onClick={() => this.setState(state => {
        let poped = state.list.pop();
        state.list.splice(0, 0, poped);
        return {list: [...state.list]}
      })}>shift to right</button>
    </div>
    /*
    return (
      <div>
        {this.state.listIdx.map(each => this.state.list[each])}
        <button onClick={this.setState(state => ({listIdx: state.listIdx.shift()}))}>shift to right</button>
      </div>
    )

     */
  }
}

const HomePage = () => {
  return (
    <Page>
      <UnderConstruction />
    </Page>
  );
}

export default HomePage;
