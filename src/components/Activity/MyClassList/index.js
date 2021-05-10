import React from 'react';
import {View, Text} from 'react-native';
import MyClassItem from '../MyClassItem';

import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export default function MyClassList(props) {
  return (
    <View>
      <Text style={styles.title}>My class</Text>
      <View
        style={{flexDirection: 'row', paddingHorizontal: 10, marginBottom: 5}}>
        <View style={{flex: 4}}>
          <Text style={styles.thead}> Class Name</Text>
        </View>
        <View style={{flex: 2, alignItems: 'center'}}>
          <Text style={styles.thead}>Progress</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.thead}>Score</Text>
        </View>
        <View style={{width: 20}}></View>
      </View>

      <MyClassItem />
      <MyClassItem />
      <MyClassItem />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2%',
        }}>
        <Text style={{fontSize: 12}}>view all</Text>
        <Ionicons name="chevron-forward" size={20} />
      </View>
    </View>
  );
}
