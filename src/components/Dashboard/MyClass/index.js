import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ForYou from '../ForYou';

import styles from './styles';
import Color from '../../../Color';
import AllSchedule from '../AllSchedule';

export default function Dashboard(props) {
  const [tab, setTab] = useState(1);
  const tabList = ['All Schedule', 'For You'];
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <View>
          <Text style={styles.containerTitleText}>My Class</Text>
          <Text style={styles.containerSubtitle}>Today, October 10</Text>
        </View>
        <Ionicons
          name="calendar-outline"
          size={20}
          onPress={() => props.showDatePicker()}
        />
      </View>
      <View style={styles.tabs}>
        {tabList.map((tabName, tabIndex) => (
          <TouchableOpacity key={tabIndex} onPress={() => setTab(tabIndex)}>
            <Text
              style={{
                ...styles.tabItem,
                color:
                  tab === tabIndex ? Color.PRIMARY : 'rgba(173, 169, 187, 1)',
              }}>
              {tabName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {tab === 1 ? (
        <ForYou data={props.data} />
      ) : (
        <AllSchedule data={props.data} />
      )}
    </View>
  );
}
