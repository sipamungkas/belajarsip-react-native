import React, {useState} from 'react';
import {ScrollView, Text} from 'react-native';

import MyClassList from '../../components/Activity/MyClassList/index';

import styles from './styles';

export default function ActivityStudent(props) {
  return (
    <ScrollView style={styles.container}>
      <MyClassList />
    </ScrollView>
  );
}
