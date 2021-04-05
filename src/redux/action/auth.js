import jwt_decode from 'jwt-decode';
import http from '../../helper/http';
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
export const temporaryToken = (token) => {
  return async (dispatch) => {
    dispatch({
      type: 'TEMPORAY_TOKEN',
      payload: token,
    });
  };
};

export const login = (token) => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGIN',
      token: token,
    });
    const {id} = jwt_decode(token);
    try {
      const response = await http().get(`profile/${id}`);
      dispatch({
        type: 'PROFILE',
        profile: response.data.results,
      });
    } catch (err) {
      dispatch({
        type: 'SET_MESSAGE',
        message: err.response.data.message,
      });
    }
  };
};

export const updateProfile = (data) => {
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: data,
    });
  };
};

export const logout = (id) => {
  return async (dispatch) => {
    await http().delete(`auth?id=${id}`);
    dispatch({
      type: 'LOGIN',
      token: null,
    });
  };
};
