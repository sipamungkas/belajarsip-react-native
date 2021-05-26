import React from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

import {API_URL} from '@env';

export default function StudentItem(props) {
  const {student, onPress, ellipsis} = props;

  return (
    <Card style={styles.card} theme={{roundness: 0}} onPress={onPress}>
      <Card.Content style={{flexDirection: 'row', alignItems: 'center'}}>
        {student?.avatar ? (
          <Avatar.Image
            size={40}
            source={{uri: `${API_URL}/images/${student?.avatar}`}}
          />
        ) : (
          <Avatar.Text size={40} label={student?.name?.slice(0, 1) || '-'} />
        )}
        <Text numberOfLines={1} style={styles.name}>
          {student?.name || 'No Name'}
        </Text>
        {ellipsis !== false && (
          <TouchableWithoutFeedback style={styles.more}>
            <Ionicons name="ellipsis-vertical" color="black" size={20} />
          </TouchableWithoutFeedback>
        )}
      </Card.Content>
    </Card>
  );
}
