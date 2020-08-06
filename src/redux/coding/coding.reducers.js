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
    default:
      return state;
  }
}

export default  codingReducers;