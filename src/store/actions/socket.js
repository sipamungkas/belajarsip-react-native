import {SET_SOCKET} from './actionTypes';

export function setSocket(socket) {
  return {
    type: SET_SOCKET,
    payload: socket,
  };
}
