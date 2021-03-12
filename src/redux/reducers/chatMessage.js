const initialState = {
  messageList: [
    {
      senderId: 1,
      name: 'Hibram',
      message: 'hi',
    },
    {
      senderId: 1,
      name: 'Hibram',
      message: 'ker naon',
    },
    {
      senderId: 10,
      name: 'Hibram',
      message: 'karek hudang sare',
    },
    {
      senderId: 1,
      name: 'Hibram',
      message: 'oh',
    },
    {
      senderId: 10,
      name: 'Hibram',
      message: 'hh',
    },
  ],
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
