import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import ProgressCircle from 'react-native-progress-circle';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export default function MyClassItem(props) {
  const {course} = props;
  console.log(course.id);
  return (
    <Card
      style={{marginVertical: 2}}
      elevation={2}
      theme={{roundness: 10}}
      onPress={() =>
        props.navigation.navigate('MyClassDetail', {
          courseId: course.id,
          courseName: course?.name || 'Untitled',
        })
      }>
      <View style={styles.item}>
        <View style={{flex: 4}}>
          <Text style={styles.title}>{course?.name || 'Untitled'}</Text>
        </View>
        <View style={{flex: 2, alignItems: 'center'}}>
          <ProgressCircle
            percent={course?.progress || 0}
            radius={20}
            borderWidth={3}
            color="#3399FF"
            shadowColor="#fff"
            bgColor="#fff">
            <Text style={{fontSize: 12}}>{`${course?.progress || 0}%`}</Text>
          </ProgressCircle>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.score}>{Math.floor(course?.score) || 0}</Text>
        </View>
        <TouchableOpacity style={{width: 20}}>
          <Ionicons name="ellipsis-vertical" color="black" size={20} />
        </TouchableOpacity>
      </View>
    </Card>
  );
}
