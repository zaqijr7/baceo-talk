import http from '../../helper/http';

export const historyMsg = (token, receipent) => {
  return async (dispatch) => {
    const response = await http(token).get(`chat/${receipent}`);
    dispatch({
      type: 'HISTORY_MESSAGE',
      payload: response.data.result,
      pageInfo: response.data.pageInfo,
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

export const flatListChatHistory = (dataMsg, pagingMsg) => {
  return async (dispatch) => {
    console.log(
      pagingMsg,
      '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ini pagination di action',
    );
    dispatch({
      type: 'HISTORY_MESSAGE',
      payload: dataMsg,
      pageInfo: pagingMsg,
    });
  };
};

export const cleanMsg = () => {
  return async (dispatch) => {
    dispatch({
      type: 'HISTORY_MESSAGE',
      payload: [],
      pageInfo: null,
    });
  };
};
