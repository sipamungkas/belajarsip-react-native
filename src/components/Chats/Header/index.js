import React, {useRef, useState} from 'react';
import {View, Text, StatusBar, Animated, Easing, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import NewGroupIcon from '../../../assets/icons/new-group-icon.svg';

import Color from '../../../Color';
import styles from './styles';

export default function Header() {
  const navigation = useNavigation();

  const [create, setCreate] = useState(0);
  const animation = useRef(new Animated.Value(create ? 0 : 1)).current;

  // First set up animation
  Animated.timing(animation, {
    toValue: create ? 1 : 0,
    duration: 300,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  }).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.PRIMARY} />
      <View>
        <View style={styles.main}>
          <Text numberOfLines={1} style={styles.title}>
            {create ? 'Create' : 'Chat'}
          </Text>
          <Animated.View style={{transform: [{rotate: spin}]}}>
            <Ionicons
              name="add-circle"
              size={30}
              color="white"
              onPress={() => {
                setCreate(!create);
              }}
            />
          </Animated.View>
        </View>

        {create === true && (
          <Animated.View style={[styles.options, {opacity: opacity}]}>
            <View style={styles.icon}>
              <View style={styles.iconContainer}>
                <Ionicons name="chatbox-ellipses" size={20} />
              </View>
              <Text style={styles.iconText}>Chat</Text>
            </View>
            <View style={styles.icon}>
              <View style={styles.iconContainer}>
                <NewGroupIcon />
              </View>
              <Text style={styles.iconText}>Group</Text>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}
