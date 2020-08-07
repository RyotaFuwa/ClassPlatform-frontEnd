const INITIAL_STATE = {
  currentClass: null,
}

const codingReducers = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SET_CURRENT_CLASS':
      return {
        ...state,
        currentClass: action.payload,
      };
    default:
      return state;
  }
}

export default  codingReducers;
