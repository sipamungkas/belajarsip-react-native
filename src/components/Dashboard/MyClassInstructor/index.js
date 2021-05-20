import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import ForYouInstructor from '../ForYouInstructor';

import styles from './styles';
import Color from '../../../Color';

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
        <Button
          icon={() => <Ionicons name="add-circle" color="white" size={24} />}
          color={Color.PRIMARY}
          mode="contained"
          style={styles.addTaskBtn}
          theme={{roundness: 20}}
          onPress={() => {}}>
          Add Task
        </Button>
      </View>
    </View>
  );
}
