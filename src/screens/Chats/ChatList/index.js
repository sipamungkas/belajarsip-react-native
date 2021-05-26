import React from 'react';
import {View, Text} from 'react-native';
import Header from '../../../components/Chats/Header';

import styles from './styles';

export default function ChatList() {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
}
