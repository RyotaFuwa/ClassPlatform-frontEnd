const INITIAL_STATE = {
  currentCodingQuestion: null,
}

const codingReducers = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SET_CURRENT_CODING_QUESTION':
      return {
        ...state,
        currentCodingQuestion: action.payload,
      };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default  codingReducers;