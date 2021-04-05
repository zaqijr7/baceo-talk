export const setTokenNotif = (token) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_TOKEN_NOTIF',
      tokenNotif: token,
    });
  };
};
