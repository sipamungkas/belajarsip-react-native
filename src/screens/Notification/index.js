import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Notification/Header';
import NotificationItem from '../../components/Notification/NotificationItem';
import {getNotifications} from '../../services/api/notifications';
import {snackbarError} from '../../store/actions/snackbar';
import {errorFormatter} from '../../utils/Error';
import styles from './styles';

let id = 0;
const today = [
  {
    id: id++,
    image: 'hot',
    content: 'There are 10 news update for today. Don’t miss it!',
    time: '2 min',
  },
  {
    id: id++,
    image: 'avatar',
    content: 'Nissa Sabyan sent you a message',
    time: '2 min',
  },
  {
    id: id++,
    image: 'avatar',
    content: 'Rio Dewanto sent you a message',
    time: '2 min',
  },
  {
    id: id++,
    image: 'activity',
    content: 'You have 2 classes today.',
    time: '15 hr',
  },
];

const yesterday = [
  {
    id: id++,
    image: 'hot',
    content: 'There are 10 news update for today. Don’t miss it!',
    time: 'yesterday',
  },
  {
    id: id++,
    image: 'avatar',
    content: 'Nissa Sabyan sent you a message',
    time: 'yesterday',
  },
  {
    id: id++,
    image: 'avatar',
    content: 'Rio Dewanto sent you a message',
    time: 'yesterday',
  },
  {
    id: id++,
    image: 'activity',
    content: 'You have 2 classes today.',
    time: 'yesterday',
  },
];

export default function Notification() {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const authReducer = useSelector(state => state.authReducer);
  const {token} = authReducer.user;

  useEffect(() => {
    getNotifications(token)
      .then(res => {
        console.log(res.data.data);
        setNotifications(res.data.data);
      })
      .catch(err => {
        const msg = errorFormatter(err);
        if (msg === 'jwt expired') {
          dispatch(
            snackbarError('Session Expired Please Logout and Login again!'),
          );
        } else {
          snackbarError(msg);
        }
      });
  }, [token, dispatch]);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        {/* <Text style={styles.subtitle}>Today</Text> */}
        <View style={styles.notificationContainer}>
          {notifications.map((item, index) => (
            <NotificationItem
              key={index}
              content={item.content}
              time={moment(item.created_at).fromNow()}
              image={item.image}
            />
          ))}
        </View>
        {/* <Text style={styles.subtitle}>Yesterday</Text>
        <View style={styles.notificationContainer}>
          {yesterday.map((item, index) => (
            <NotificationItem
              key={index}
              content={item.content}
              time={item.time}
              image={item.image}
            />
          ))}
        </View>
        <Text style={styles.subtitle}>This Week</Text>
        <View style={styles.notificationContainer}>
          {yesterday.map((item, index) => (
            <NotificationItem
              key={index}
              content={item.content}
              time={item.time}
              image={item.image}
            />
          ))}
        </View> */}
      </ScrollView>
    </View>
  );
}
