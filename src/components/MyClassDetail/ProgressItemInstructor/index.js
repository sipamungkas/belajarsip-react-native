import React from 'react';
import {Text, View} from 'react-native';
import {Card, Checkbox} from 'react-native-paper';
import {dateYMD, durationToTime} from '../../../utils/TimeConverter';
import moment from 'moment';

import Color from '../../../Color';

import styles from './styles';

const today = moment();

export default function ProgressItem(props) {
  const {title, date, session_start: startAt, duration} = props.subcourse;
  return (
    <Card elevation={3} theme={{roundness: 8}} style={styles.card}>
      <View style={styles.itemContainer}>
        <Checkbox
          color={Color.PRIMARY}
          status={moment(date) < today ? 'checked' : ''}
        />
        <Text style={styles.title} numberOfLines={1}>
          {title || 'Untitled'}
        </Text>
        <View>
          <Text style={[styles.score]} numberOfLines={2}>
            {dateYMD(date)}
          </Text>
          <Text style={[styles.score]} numberOfLines={2}>
            {durationToTime(startAt, duration)}
          </Text>
        </View>
      </View>
    </Card>
  );
}
