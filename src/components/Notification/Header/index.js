import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import Color from '../../../Color';
import styles from './styles';

export default function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.PRIMARY} />
      <View style={styles.main}>
        <Text numberOfLines={1} style={styles.title}>
          Notification
        </Text>
        <Ionicons
          name="close-circle"
          size={30}
          color="white"
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
      </View>
    </View>
  );
}
