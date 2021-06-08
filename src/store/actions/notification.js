import {SET_MSG_NOTIFICATION, SET_NEW_NOTIFICATION} from './actionTypes';

export function setNewNotification(value) {
  return {
    type: SET_NEW_NOTIFICATION,
    payload: value,
  };
}

export function setNewMsgNotification(value) {
  return {
    type: SET_MSG_NOTIFICATION,
    payload: value,
  };
}
