export const saveDataRegis = (email, phoneNum) => {
  return async (dispatch) => {
    dispatch({
      type: 'SAVE_EMAIL',
      payload: email,
    });
    dispatch({
      type: 'SAVE_PHONENUM',
      payload: phoneNum,
    });
  };
};

export const login = (token) => {
  return async (dispatch) => {};
};
