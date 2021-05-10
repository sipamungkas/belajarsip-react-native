import React, {useState} from 'react';
import {View, ScrollView, StatusBar} from 'react-native';

import Header from '../../components/Header';
import MyClassList from '../../components/Activity/MyClassList/index';
import AvailableClassList from '../../components/Activity/AvailableClassList';

import styles from './styles';

export default function ActivityStudent(props) {
  return (
    <View>
      <Header title="Activity" />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {paddingBottom: StatusBar.currentHeight + 115},
        ]}>
        <MyClassList {...props} />
        <AvailableClassList />
      </ScrollView>
    </View>
  );
}
