import http from '../../helper/http';

export const historyInteraction = (token) => {
  return async (dispatch) => {
    const response = await http(token).get('history');
    dispatch({
      type: 'INTERACTION_HISTORY',
      payload: response.data.results,
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
