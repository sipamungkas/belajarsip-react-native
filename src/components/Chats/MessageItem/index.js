import React from 'react';
import {Text} from 'react-native';
import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Color from '../../../Color';
import styles from './styles';

export default function MessageItem(props) {
  const {isSender} = props;
  return (
    <Card
      elevation={0}
      style={[styles.card, isSender && {backgroundColor: Color.PRIMARY}]}>
      <Card.Content>
        <Text style={[styles.content, isSender && styles.senderContent]}>
          Lorem ipsum loreeeemmmm ipsummmm
        </Text>

        <Text style={[styles.time, isSender && styles.timeSender]}>
          2021-06-07 <Ionicons name="checkmark-outline" />
        </Text>
      </Card.Content>
    </Card>
  );
}
