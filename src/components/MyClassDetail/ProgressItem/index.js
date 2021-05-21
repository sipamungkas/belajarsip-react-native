import React from 'react';
import {Text, View} from 'react-native';
import {Card, Checkbox} from 'react-native-paper';

import Color from '../../../Color';
import {scoreColor} from '../../../utils/Score';

import styles from './styles';

export default function ProgressItem(props) {
  const {title, score} = props.subcourse;
  return (
    <Card elevation={3} theme={{roundness: 8}} style={styles.card}>
      <View style={styles.itemContainer}>
        <Checkbox color={Color.PRIMARY} status={score ? 'checked' : ''} />
        <Text style={styles.title} numberOfLines={1}>
          {title || 'Untitled'}
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
