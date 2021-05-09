import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

export default function DashboardHeader(props) {
  return (
    <View style={styles.firstRow}>
      <Text style={styles.welcome}>Welcome Back,</Text>
      <Text style={styles.name}>Emir</Text>
    </View>
  );
}
