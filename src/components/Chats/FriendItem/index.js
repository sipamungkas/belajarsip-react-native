import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {Card, Avatar, Checkbox} from 'react-native-paper';
import {API_URL} from '@env';
import styles from './styles';

export default function FriendItem(props) {
  const [avatarError, setAvatarError] = useState(false);
  return (
    <Card elevation={0} onPress={props.onPress}>
      <Card.Content style={styles.container}>
        {props?.avatar && !avatarError ? (
          <Image
            style={styles.avatar}
            // size={50}
            height={50}
            width={50}
            borderRadius={25}
            onError={() => setAvatarError(true)}
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
        {props.checkbox && (
          <View style={styles.time}>
            <Checkbox
              onPress={props.onPress}
              status={props.checked ? 'checked' : 'unchecked'}
            />
          </View>
        )}
      </Card.Content>
    </Card>
  );
}
