import * as React from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';

import {logoutHandler} from '../../store/actions/auth';

function UnAuthorizedHandler(props, message) {
  const dispatch = useDispatch();
  Alert.alert('Error', message || 'An Error has been occured', [
    {
      text: 'Login',
      onPress: () => {
        dispatch(logoutHandler());
      },
    },
  ]);
}

export default UnAuthorizedHandler;
