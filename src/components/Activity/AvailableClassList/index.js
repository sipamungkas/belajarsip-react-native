import React from 'react';
import {View, Text, FlatList} from 'react-native';

import SearchBox from '../SearchBox';
import styles from './styles';

const courses = [
  {
    id: 4,
    name: 'HTML CSS Fundamentals',
    category_id: 1,
    level_id: 1,
    price: 4,
    session_start: '08:00:00',
    duration: 5400000,
    start_date: '2021-03-28T17:00:00.000Z',
    day_id: 1,
    description: 'This Description',
    level: 'Beginner',
    category: 'Software',
  },
  {
    id: 4,
    name: 'HTML CSS Fundamentals',
    category_id: 1,
    level_id: 1,
    price: 4,
    session_start: '08:00:00',
    duration: 5400000,
    start_date: '2021-03-28T17:00:00.000Z',
    day_id: 1,
    description: 'This Description',
    level: 'Beginner',
    category: 'Software',
  },
];

export default function AvailableClassList(props) {
  return (
    <View>
      <Text style={styles.title}>New Class</Text>
      <SearchBox />
      {courses.map(course => (
        <Text key={course.id}>{course.name}</Text>
      ))}
    </View>
  );
}
