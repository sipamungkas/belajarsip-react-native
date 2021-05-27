import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Header from '../../components/Notification/Header';
import NotificationItem from '../../components/Notification/NotificationItem';
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
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Today</Text>
        <View style={styles.notificationContainer}>
          {today.map((item, index) => (
            <NotificationItem
              key={index}
              content={item.content}
              time={item.time}
              image={item.image}
            />
          ))}
        </View>
        <Text style={styles.subtitle}>Yesterday</Text>
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
        </View>
      </ScrollView>
    </View>
  );
}
