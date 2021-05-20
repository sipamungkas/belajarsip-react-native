import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import ForYouInstructor from '../ForYouInstructor';

import styles from './styles';

export default function Dashboard(props) {
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <View>
          <Text style={styles.containerTitleText}>My Class</Text>
        </View>
        <Ionicons
          name="calendar-outline"
          size={20}
          onPress={() => props.showDatePicker()}
        />
      </View>
      <Text style={styles.containerSubtitle}>
        {moment(props.date).format('MMMM YYYY')}
      </Text>
      <View style={{paddingBottom: StatusBar.currentHeight + 115}}>
        <ForYouInstructor {...props} />
      </View>
    </View>
  );
}
