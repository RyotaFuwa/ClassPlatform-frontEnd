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
    case 'UPDATE_CURRENT_CLASS':
      return {
        ...state,
        currentClass: {...state.currentClass, ...action.payload},
      }
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default  codingReducers;
