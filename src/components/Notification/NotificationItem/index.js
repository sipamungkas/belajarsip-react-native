import React from 'react';
import {View, Text, Image} from 'react-native';
import {Avatar} from 'react-native-paper';
import {API_URL} from '@env';
import ActivityIcon from '../../../assets/icons/notif-activity-icon.png';
import HotIcon from '../../../assets/icons/notif-hot-icon.png';
import AvatarIcon from '../../../assets/icons/notif-avatar-icon.png';
import styles from './styles';

const renderImage = image => {
  switch (image) {
    case 'hot':
      return HotIcon;
    case 'activity':
      return ActivityIcon;
    case 'avatar':
      return AvatarIcon;
    default:
      return null;
  }
};

export default function NotificationItem(props) {
  const {image, content, time} = props;
  //   const imgSrc = image ? {uri: `${API_URL}/images/${image}`} : ActivityIcon;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={renderImage(image)}
        />
      </View>
      <Text numberOfLines={2} style={styles.content}>
        {content || 'No Content'}
      </Text>
      <Text style={styles.time}>{time || '1 month'}</Text>
    </View>
  );
}
