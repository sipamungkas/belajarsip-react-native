import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

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
          <Text style={styles.containerSubtitle}>
            {moment(props.date).format('YYYY MM DD') ===
            moment(Date.now()).format('YYYY MM DD')
              ? 'Today'
              : moment(props.date).format('dddd')}
            , {moment(props.date).format('D MMMM')}
          </Text>
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
      <View style={{paddingBottom: StatusBar.currentHeight + 115}}>
        {tab === 1 ? (
          <ForYou date={props.date} />
        ) : (
          <AllSchedule data={props.data} date={props.date} />
        )}
      </View>
    </View>
  );
}
