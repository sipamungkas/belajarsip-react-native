import React from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Searchbar, Avatar} from 'react-native-paper';

import Color from '../../Color';
import styles from './styles';

import {API_URL} from '@env';

export default function Header(props) {
  const {back, title, mode, user} = props;
  switch (mode) {
    case 'profile':
      return (
        <View style={[styles.container, styles.profileContainer]}>
          <StatusBar backgroundColor={Color.PRIMARY} />
          <View style={styles.main}>
            {back && <Ionicons name="chevron-back" size={30} color="white" />}
            <Text style={[styles.title, styles.titleProfile]}>{title}</Text>
          </View>
          <View style={styles.profileDetail}>
            {user.avatar !== null ? (
              <Image
                style={[styles.avatar, {borderRadius: '50%'}]}
                height={45}
                width={45}
                source={{uri: `${API_URL}/${user.avatar}`}}
                resizeMode="cover"
                resizeMethod="auto"
              />
            ) : (
              <Avatar.Text
                style={[styles.avatar, {backgroundColor: 'white'}]}
                color={Color.PRIMARY}
                size={50}
                label={user.name.slice(0, 1)}
              />
            )}
            {/* <Image
              style={styles.avatar}
              height={45}
              width={45}
              source={{uri: `${API_URL}/${user.avatar}`}}
            /> */}
            <View style={styles.info}>
              <Text style={styles.profileName}>
                {user?.name || 'Emir Kharisma'}
              </Text>
              <Text style={styles.online}>Online</Text>
            </View>
          </View>
        </View>
      );
    case 'dashboard':
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor={Color.PRIMARY} />
          <View style={styles.main}>
            {back && (
              <Ionicons
                name="chevron-back"
                size={30}
                color="white"
                onPress={() => props.navigation.goBack()}
              />
            )}
            <Text style={styles.title}>{title}</Text>
          </View>
          <Searchbar
            style={{height: 40, marginTop: 10, backgroundColor: '#E5E6EB'}}
            theme={{roundness: 30}}
            inputStyle={{fontFamily: 'Roboto-Regular', fontSize: 15}}
            placeholder="Looking for something?"
            clearButtonMode="always"
          />
        </View>
      );
    default:
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor={Color.PRIMARY} />
          <View style={styles.main}>
            {back && (
              <Ionicons
                name="chevron-back"
                size={30}
                color="white"
                onPress={() => props.navigation.goBack()}
              />
            )}
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      );
  }
}
