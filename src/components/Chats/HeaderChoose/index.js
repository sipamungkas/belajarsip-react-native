import React, {useRef, useState} from 'react';
import {View, Text, StatusBar, TouchableNativeFeedback} from 'react-native';
import {Searchbar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import Color from '../../../Color';
import styles from './styles';

export default function Header(props) {
  const navigation = useNavigation();
  const {title, rightText, onRightPress} = props;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.PRIMARY} />
      <View>
        <View style={styles.main}>
          <Ionicons
            name="chevron-back"
            size={30}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          {props.right && (
            <TouchableNativeFeedback onPress={onRightPress}>
              <Text style={styles.rightText}>{rightText || 'Next'}</Text>
            </TouchableNativeFeedback>
          )}
        </View>
        {props.search && (
          <Searchbar
            style={{height: 40, marginTop: 20, backgroundColor: '#E5E6EB'}}
            theme={{roundness: 30}}
            inputStyle={{fontFamily: 'Roboto-Regular', fontSize: 15}}
            placeholder="Looking for something?"
            clearButtonMode="always"
          />
        )}
      </View>
    </View>
  );
}
