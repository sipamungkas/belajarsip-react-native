import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Header from '../../../components/Chats/Header';
import ChatItem from '../../../components/Chats/ChatItem';

import styles from './styles';

let id = 0;

const DATA = [
  {
    id: id++,
    name: 'Nissa Sabyan',
    content: 'How about number 3?',
    time: '10.15 pm',
  },
  {
    id: id++,
    name: 'Rio Dewanto',
    content: 'I’m hungry.',
    time: '9.12 pm',
  },
  {
    id: id++,
    name: 'Discussion Group 21 (5)',
    content: 'Nissa : Let’s finish the task for tomorrow morning',
    time: '1.23 pm',
  },
  {
    id: id++,
    name: 'Isyana Sarasvati',
    content: 'Thanks.',
    time: 'Yesterday',
  },
  {
    id: id++,
    name: 'Tompi',
    content: 'See you later!.',
    time: 'Yesterday',
  },
  {
    id: id++,
    name: 'You, Tompi, Isyana Sarasvati, Peppy',
    content: 'Haha. Yes, I heard it before that you and rossa..',
    time: '8/10',
  },
  {
    id: id++,
    name: 'Nissa Sabyan',
    content: 'How about number 3?',
    time: '10.15 pm',
  },
  {
    id: id++,
    name: 'Rio Dewanto',
    content: 'I’m hungry.',
    time: '9.12 pm',
  },
  {
    id: id++,
    name: 'Discussion Group 21 (5)',
    content: 'Nissa : Let’s finish the task for tomorrow morning',
    time: '1.23 pm',
  },
  {
    id: id++,
    name: 'Isyana Sarasvati',
    content: 'Thanks.',
    time: 'Yesterday',
  },
  {
    id: id++,
    name: 'Tompi',
    content: 'See you later!.',
    time: 'Yesterday',
  },
  {
    id: id++,
    name: 'You, Tompi, Isyana Sarasvati, Peppy',
    content: 'Haha. Yes, I heard it before that you and rossa..',
    time: '8/10',
  },
];

export default function ChatList() {
  const [create, setCreate] = useState(false);
  const renderItem = ({item}) => (
    <ChatItem
      item={item}
      name={item.name}
      content={item.content}
      time={item.time}
    />
  );
  return (
    <View style={styles.container}>
      <Header create={create} setCreate={setCreate} />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {create && <View style={styles.overlay} />}
    </View>
  );
}
