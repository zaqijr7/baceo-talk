export const chatFocus = (data) => {
  return async (dispatch) => {
    dispatch({
      type: 'CHAT_FOCUS',
      payload: data,
    });
  };
};
