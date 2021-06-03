import {SET_NEW_NOTIFICATION} from './actionTypes';

export function setNewNotification(value) {
  return {
    type: SET_NEW_NOTIFICATION,
    payload: value,
  };
}
