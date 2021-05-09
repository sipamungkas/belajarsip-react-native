import React from 'react';
import {ScrollView, Text} from 'react-native';

import News from '../News';

import styles from './styles';

export default function DashboardStudent(props) {
  const newsData = [
    {
      id: 1,
      title: 'Microsoft try to implement work from home forever',
      image: '',
    },
    {
      id: 2,
      title: '2 Microsoft try to implement work from home forever',
      image: '',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <News data={newsData} />
    </ScrollView>
  );
}
