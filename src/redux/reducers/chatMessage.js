const initialState = {
  messageList: [],
  messageRespon: '',
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CHAT':
      return {
        ...state,
        messageList: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
