import React, {Component} from 'react';
import './ToDoList.css';
import {Create, Delete, Update} from "../../icons";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      newTask: '',
    }
  }

  componentDidMount() {
    //fetch data from db
  }

  add() {
    // you might wanna save somewhere locally or remotely
    let status = 200; // test
    if(status === 200)
      this.setState(state => ({list: [...state.list, state.newTask], newTask: ''}));
  }

  render() {
    return (
      <div className='to-do-list'>
        <div className='mb-2'>
          <input className='border-0'
                 placeholder='To Do List'
                 value={this.state.newTask}
                 onChange={(e) => this.setState({newTask: e.target.value})} /> &nbsp;
          <Create onClick={() => this.add()} />
        </div>
          {this.state.list.map((each, idx) =>
            <div key={idx} className='to-do-block'>
              <div className='block'>{each}</div>
              <Delete
                onClick={() => this.setState(state => {
                  let newList = [...state.list];
                  newList.splice(idx, 1);
                  return {list: newList};
                })}
              />
            </div>
          )}
      </div>
    )
  }
}

export default ToDoList;
