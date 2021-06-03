import {SET_NEW_NOTIFICATION} from '../actions/actionTypes';

const initialState = {
  newNotification: false,
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_NOTIFICATION:
      return {
        ...state,
        newNotification: action.payload,
      };

    default:
      return initialState;
  }
};
