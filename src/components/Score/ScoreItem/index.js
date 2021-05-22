import React from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-paper';
import {scoreColor} from '../../../utils/Score';
import styles from './styles';

export default function ScoreItem(props) {
  const {subcourse, onPress} = props;
  return (
    <Card
      style={styles.card}
      elevation={2}
      theme={{roundness: 0}}
      onPress={onPress}>
      <Card.Content style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {subcourse?.title || 'untitle'}
        </Text>
        <Text
          style={[styles.score, {color: scoreColor(subcourse?.score || 0)}]}>
          {subcourse?.score || 'N/A'}
        </Text>
        <View style={styles.more} />
      </Card.Content>
    </Card>
  );
}
