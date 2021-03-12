const initialState = {
  friendList: [
    {
      name: 'Rizal',
      message: 'Hi !',
    },
    {
      name: 'Hibram',
      message: 'Hi !',
    },
    {
      name: 'Isas',
      message: 'Hi !',
    },
    {
      name: 'Zaqi',
      message: 'Hi !',
    },
    {
      name: 'Rizki',
      message: 'Hi !',
    },
    {
      name: 'Ridho',
      message: 'Hi !',
    },
    {
      name: 'Abbi',
      message: 'Hi !',
    },
    {
      name: 'Shafa',
      message: 'Hi !',
    },
    {
      name: 'Yosef',
      message: 'Hi !',
    },
    {
      name: 'Ridho',
      message: 'Hi !',
    },
  ],
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
