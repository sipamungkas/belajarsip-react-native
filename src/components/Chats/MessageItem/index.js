import moment from 'moment';
import React from 'react';
import {Text} from 'react-native';
import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Color from '../../../Color';
import styles from './styles';

export default function MessageItem(props) {
  const {isSender, item} = props;
  console.log(item);
  return (
    <Card
      elevation={0}
      style={[styles.card, isSender && {backgroundColor: Color.PRIMARY}]}>
      <Card.Content>
        {!isSender && <Text style={styles.sender}>{item?.name}</Text>}
        <Text style={[styles.content, isSender && styles.senderContent]}>
          {item.content}
        </Text>

        <Text style={[styles.time, isSender && styles.timeSender]}>
          {moment(item.created_at).format('Y-MM-DD H:m:s')}
          <Ionicons name="checkmark-outline" />
        </Text>
      </Card.Content>
    </Card>
  );
}
