import {SET_SOCKET} from '../actions/actionTypes';

const initialState = {socket: {}};

export const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
