import React from 'react';
import {View, Text} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import {API_URL} from '@env';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export default function ChatItem(props) {
  const navigation = useNavigation();
  return (
    <Card
      elevation={0}
      onPress={() =>
        navigation.navigate('Message', {
          roomId: props.item.id,
          roomName: props.item.name,
        })
      }>
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
          <Text numberOfLines={1} style={styles.content}>
            {props?.content || 'No Content'}{' '}
          </Text>
        </View>
        <Text style={styles.time}>{props.time || '00:00'}</Text>
      </Card.Content>
    </Card>
  );
}
