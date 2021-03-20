const intialState = {
  token: null,
  profile: [],
  emailRegis: '',
  phoneNumRegis: '',
  authMessage: '',
};

const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.token,
      };
    case 'PROFILE':
      return {
        ...state,
        profile: action.profile,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: action.payload,
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        profile: action.message,
      };
    case 'SAVE_EMAIL':
      return {
        ...state,
        emailRegis: action.payload,
      };
    case 'SAVE_PHONENUM':
      return {
        ...state,
        phoneNumRegis: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
