import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import StudentIcon from '../../../assets/icons/student-icon.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export default function MyClassItem(props) {
  const {course} = props;
  return (
    <Card
      style={styles.card}
      elevation={2}
      theme={{roundness: 10}}
      onPress={() =>
        props.navigation.navigate('MyClassDetail', {
          courseId: course.id,
          courseName: course?.name || 'Untitled',
        })
      }>
      <View style={styles.item}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {course?.name || 'Untitled'}
          </Text>
        </View>
        <View style={styles.studentContainer}>
          <Text style={styles.studentCount}>{course?.students || 0}</Text>
          <StudentIcon width={22} height={22} />
        </View>
        <TouchableOpacity style={{width: 20}}>
          <Ionicons name="chevron-forward" color="black" size={20} />
        </TouchableOpacity>
      </View>
    </Card>
  );
}
