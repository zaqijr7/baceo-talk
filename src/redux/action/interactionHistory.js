export const historyInteraction = (data) => {
  return async (dispatch) => {
    dispatch({
      type: 'INTERACTION_HISTORY',
      payload: data,
    });
  };
};
export const msgResponse = (data) => {
  return async (dispatch) => {
    dispatch({
      type: 'MESSAGE_RESPONSE',
      payload: data,
    });
  };
};
