const initialState = {
  messageList: [],
  pageInfoHistoryMsg: null,
  messageRespon: '',
  interaction: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HISTORY_MESSAGE':
      return {
        ...state,
        messageList: action.payload,
      };
    case 'PAGE_INFO_HISTORY_MESSAGE':
      return {
        ...state,
        pageInfoHistoryMsg: action.payload,
      };
    case 'INTERACTION_HISTORY':
      return {
        ...state,
        interaction: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
