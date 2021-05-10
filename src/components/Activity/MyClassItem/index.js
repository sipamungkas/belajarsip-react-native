import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityComponent,
} from 'react-native';
import {Card} from 'react-native-paper';
import ProgressCircle from 'react-native-progress-circle';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export default function MyClassItem(props) {
  return (
    <Card style={{marginVertical: 2}} elevation={2} theme={{roundness: 10}}>
      <View style={styles.item}>
        <View style={{flex: 4}}>
          <Text style={styles.title}>Front-end fundamentals</Text>
        </View>
        <View style={{flex: 2, alignItems: 'center'}}>
          <ProgressCircle
            percent={50}
            radius={20}
            borderWidth={3}
            color="#3399FF"
            shadowColor="#fff"
            bgColor="#fff">
            <Text style={{fontSize: 14}}>{`${50}%`}</Text>
          </ProgressCircle>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.score}>90</Text>
        </View>
        <TouchableOpacity style={{width: 20}}>
          <Ionicons name="ellipsis-vertical" color="black" size={20} />
        </TouchableOpacity>
      </View>
    </Card>
  );
}
