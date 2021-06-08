import {
  SET_NEW_NOTIFICATION,
  SET_MSG_NOTIFICATION,
} from '../actions/actionTypes';

const initialState = {
  newNotification: false,
  newMsgNotification: false,
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_NOTIFICATION:
      return {
        ...state,
        newNotification: action.payload,
      };
    case SET_MSG_NOTIFICATION:
      return {
        ...state,
        newMsgNotification: action.payload,
      };
    default:
      return initialState;
  }
};
