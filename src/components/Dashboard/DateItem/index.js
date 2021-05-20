import React from 'react';
import {View, Text, TouchableNativeFeedback} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import styles from './styles';

export default function DateItem(props) {
  const {active, day, date, onPress} = props;
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[styles.surface, active ? styles.active : '']}>
        <Text style={[styles.inActive, active ? styles.activeText : '']}>
          {day ?? '-'}
        </Text>
        <Text style={[styles.inActive, active ? styles.activeText : '']}>
          {date ?? '-'}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}
