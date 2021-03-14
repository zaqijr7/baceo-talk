import axios from 'axios';
import {REACT_APP_API_URL as API_URL} from '@env';

const http = (token = null) => {
  const headers = token && {
    authorization: `Bearer ${token}`,
  };
  return axios.create({
    baseURL: API_URL,
    headers,
  });
};

export default http;
