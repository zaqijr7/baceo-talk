const intialState = {
  profile: {
    id: 10,
    name: 'Muhammad Zaqi',
    phoneNumber: '085842752523',
  },
  authMessage: '',
};

const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
