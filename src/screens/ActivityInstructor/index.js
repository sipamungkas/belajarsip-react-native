import React, {useState} from 'react';
import {View, ScrollView, StatusBar} from 'react-native';

import Header from '../../components/Header';
import MyClassListInstructor from '../../components/Activity/MyClassListInstructor/index';
import CreateCourse from '../../components/Activity/CreateCourse';

import styles from './styles';

export default function ActivityStudent(props) {
  return (
    <View>
      <Header title="Activity" />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {paddingBottom: StatusBar.currentHeight + 70},
        ]}>
        <MyClassListInstructor {...props} />
        <View style={styles.createCourseContainer}>
          <CreateCourse />
        </View>
        {/* <AvailableClassList /> */}
      </ScrollView>
    </View>
  );
}
