const intialState = {
  token: null,
  profile: [],
  authMessage: '',
};

const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        profile: action.payload,
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
