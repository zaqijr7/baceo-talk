export const historyMsg = (data) => {
  return async (dispatch) => {
    dispatch({
      type: 'HISTORY_MESSAGE',
      payload: data,
    });
  };
};
export const pageInfoHistoryMessage = (data) => {
  return async (dispatch) => {
    dispatch({
      type: 'PAGE_INFO_HISTORY_MESSAGE',
      payload: data,
    });
  };
};
