import 'react-native-gesture-handler';
import React, {useCallback, useEffect} from 'react';

import {Provider as PaperProvider, Snackbar} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useRoute,
} from '@react-navigation/native';

import {connect} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import CustomModal from '../components/CustomModal';

const Stack = createStackNavigator();

// Navigators
import AuthNavigators from './authNavigators';
import HomeNavigators from './homeNavigators';

//action
import {snackbarHide} from '../store/actions/snackbar';

// color
import Color from '../Color';
import {setIsLoading} from '../store/actions/loading';

// socket and notifications
import {io} from 'socket.io-client';
import {SOCKET_URL} from '@env';
import NotifService from '../services/notifications/NotifService';
import {
  setNewMsgNotification,
  setNewNotification,
} from '../store/actions/notification';
import {setSocket} from '../store/actions/socket';

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard';

  switch (routeName) {
    case 'Dashboard':
      // return 'Dashboard';
      return 'Dashboard';
    case 'Activity':
      return 'Activity';
    case 'Profile':
      return 'My profile';
    case 'Account':
      return 'My account';
  }
}

function App(props) {
  const {isLoggedIn} = props.authReducer;
  const {token, id: userId} = props.authReducer.user;
  const {isLoading, msg: isLoadingMsg} = props.loadingReducer;
  const {snackbar, msg, danger} = props.snackbarReducer;
  const {
    onSetNewNotification,
    onSetSocket,
    onSetNewMessageNotification,
  } = props;
  // const route = useRoute();
  // console.log(route.name);
  useEffect(() => {
    const notif = new NotifService();

    const socket = io(SOCKET_URL, {
      // timeout: 5000,
      autoConnect: false,
      reconnectionDelay: 10000,
      query: {
        token: `Bearer ${token}`,
      },
    });
    socket.connect();

    socket.on('connect', () => {
      socket.emit('join', `notification:${userId}`);
      socket.emit('join', `msgNotification:${userId}`);
      onSetSocket(socket);
    });

    socket.on('notification', notification => {
      notif.localNotif(
        notification.title || 'New Notification!',
        notification.content,
      );
      onSetNewNotification(true);
    });

    socket.on('message-notification', notification => {
      console.log('msg-notif', notification);
      notif.localNotif(
        notification.title || 'New Notification',
        notification.content,
      );
      onSetNewMessageNotification(true);
    });

    socket.on('connect_error', err => {
      console.log(err.message); // prints the message associated with the error
    });
    return () => socket.disconnect();
  }, [
    token,
    userId,
    onSetNewNotification,
    onSetSocket,
    onSetNewMessageNotification,
  ]);
  return (
    <PaperProvider>
      <NavigationContainer onReady={() => RNBootSplash.hide()}>
        <Stack.Navigator headerMode="none">
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeNavigators}
                options={({route}) => ({
                  headerTitle: getHeaderTitle(route),
                })}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Auth"
                component={AuthNavigators}
                options={({route}) => ({
                  headerTitle: getHeaderTitle(route),
                })}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Snackbar
        theme={{
          colors: {accent: 'white'},
        }}
        style={{backgroundColor: danger ? Color.DANGER : Color.PRIMARY}}
        visible={snackbar}
        onDismiss={() => props.onSnackbarHide()}
        duration={5000}
        action={{
          label: 'Ok',
          onPress: () => {
            props.onSnackbarHide();
          },
        }}>
        {msg}
      </Snackbar>
      <CustomModal
        visible={isLoading}
        type={'loading'}
        message={isLoadingMsg || 'Please wait...'}
      />
    </PaperProvider>
  );
}

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    snackbarReducer: state.snackbarReducer,
    loadingReducer: state.loadingReducer,
    socketReducer: state.socketReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSnackbarHide: () => dispatch(snackbarHide()),
    onSetIsLoading: value => dispatch(setIsLoading(value)),
    onSetNewNotification: value => dispatch(setNewNotification(value)),
    onSetNewMessageNotification: value =>
      dispatch(setNewMsgNotification(value)),
    onSetSocket: value => dispatch(setSocket(value)),
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
