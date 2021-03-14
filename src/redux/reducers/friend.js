const initialState = {
  friendList: [],
  chatFocus: {},
};

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FRIEND':
      return {
        ...state,
        friendList: [...initialState.friendList, action.payload],
      };
    case 'CHAT_FOCUS':
      return {
        ...state,
        chatFocus: action.payload,
      };
    default:
      return state;
  }
};

export default friendReducer;
