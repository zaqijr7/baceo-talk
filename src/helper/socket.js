import {io} from 'socket.io-client';

import {REACT_APP_API_URL as API_URL} from '@env';

const socket = io(API_URL);
socket.connect();

export default socket;
