const INITIAL_STATE = {
  currentUser: null,
}

const userReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default userReducers;
