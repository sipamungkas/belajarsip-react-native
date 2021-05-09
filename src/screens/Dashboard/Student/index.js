import React from 'react';
import {ScrollView, Text} from 'react-native';

import News from '../../../components/Dashboard/News';
import MyClass from '../../../components/Dashboard/MyClass';

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

  const classData = [
    {
      id: 1,
      title: 'Introduction to Banking Finance',
      time: '08.00 - 09.40',
      progress: 80,
    },
    {id: 2, title: 'History of Europe', time: '11.00 - 11.40', progress: 25},
  ];

  return (
    <ScrollView style={styles.container}>
      <News data={newsData} />
      <MyClass data={classData} />
    </ScrollView>
  );
}
