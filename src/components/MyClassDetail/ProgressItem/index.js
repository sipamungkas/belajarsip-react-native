import React from 'react';
import {Text, View} from 'react-native';
import {Button, Card, Checkbox} from 'react-native-paper';

import Color from '../../../Color';

import styles from './styles';

const scoreColor = score => {
  if (score >= 90) {
    return 'rgba(43, 231, 208, 1)';
  }
  if (score >= 70) {
    return 'rgba(81, 230, 43, 1)';
  }
  if (score >= 30) {
    return 'rgba(232, 140, 56, 1)';
  }
  if (score >= 0) {
    return 'rgba(232, 78, 56, 1)';
  }
  return '';
};

export default function ProgressItem(props) {
  const {name, score} = props.course;
  return (
    <Card elevation={3} theme={{roundness: 8}} style={styles.card}>
      <View style={styles.itemContainer}>
        <Checkbox color={Color.PRIMARY} status={score ? 'checked' : ''} />
        <Text style={styles.title} numberOfLines={1}>
          {name || 'Untitled'}
        </Text>
        {score || score !== null || score === 0 ? (
          <Text
            style={[styles.score, {color: scoreColor(score)}]}
            numberOfLines={1}>
            {score}
          </Text>
        ) : (
          <View style={styles.unfinishedContainer}>
            <View style={styles.unfinished}>
              <Text style={styles.unfinishedText}>Unfinished</Text>
            </View>
          </View>
        )}
      </View>
    </Card>
  );
}
