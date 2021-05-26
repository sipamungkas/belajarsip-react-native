import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Color from '../../../Color';
import styles from './styles';

export default function Header(props) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.PRIMARY} />
      <View style={styles.main}>
        <Ionicons
          name="chevron-back"
          size={30}
          color="white"
          onPress={() => {}}
        />
        <Text numberOfLines={1} style={styles.title}>
          Notification
        </Text>
        <Ionicons
          name="close-circle"
          size={30}
          color="white"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}
