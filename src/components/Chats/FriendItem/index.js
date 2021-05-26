import React from 'react';
import {View, Text} from 'react-native';
import {Card, Avatar, Checkbox} from 'react-native-paper';
import {API_URL} from '@env';
import styles from './styles';

export default function FriendItem(props) {
  return (
    <Card elevation={0}>
      <Card.Content style={styles.container}>
        {props?.avatar ? (
          <Avatar.Image
            style={styles.avatar}
            size={50}
            source={{uri: `${API_URL}/images/${props?.avatar}`}}
          />
        ) : (
          <Avatar.Text
            style={styles.avatar}
            size={50}
            label={props?.name?.slice(0, 1) || '-'}
          />
        )}
        <View style={styles.middle}>
          <Text numberOfLines={1} style={styles.name}>
            {props?.name || 'Anonymous'}
          </Text>
        </View>
        <View style={styles.time}>
          <Checkbox
            onPress={props.onPress}
            status={props.checked ? 'checked' : 'unchecked'}
          />
        </View>
      </Card.Content>
    </Card>
  );
}
