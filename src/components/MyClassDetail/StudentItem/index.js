import React from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default function StudentItem(props) {
  const {student, onPress} = props;
  return (
    <Card style={styles.card} theme={{roundness: 0}} onPress={onPress}>
      <Card.Content style={{flexDirection: 'row', alignItems: 'center'}}>
        {student.avatar ? (
          <Avatar.Image size={40} source={{uri: student?.avatar}} />
        ) : (
          <Avatar.Text size={40} label={student?.name?.slice(0, 1) || '-'} />
        )}
        <Text numberOfLines={1} style={styles.name}>
          {student?.name || 'No Name'}
        </Text>
        <TouchableWithoutFeedback style={styles.more}>
          <Ionicons name="ellipsis-vertical" color="black" size={20} />
        </TouchableWithoutFeedback>
      </Card.Content>
    </Card>
  );
}
