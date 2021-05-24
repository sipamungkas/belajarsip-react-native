import React from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Searchbar, Avatar} from 'react-native-paper';
import Skeleton from 'react-native-skeleton-placeholder';

import Color from '../../Color';
import styles from './styles';

import {API_URL} from '@env';

const LoadProfileSkeleton = () => (
  <Skeleton>
    <View style={styles.profileDetail}>
      <View style={[styles.avatar, {borderRadius: 50 / 2}]} />
      <View style={styles.info}>
        <View style={styles.profileNameSkeleton} />
        <View style={styles.onlineSkeleton} />
      </View>
    </View>
  </Skeleton>
);

export default function Header(props) {
  const {back, title, mode, user, isLoading} = props;
  let avatarSrc = user?.avatar || null;
  switch (mode) {
    case 'profile':
      return (
        <View style={[styles.container, styles.profileContainer]}>
          <StatusBar backgroundColor={Color.PRIMARY} />
          <View style={styles.main}>
            {back && <Ionicons name="chevron-back" size={30} color="white" />}
            <Text numberOfLines={1} style={[styles.title, styles.titleProfile]}>
              {title}
            </Text>
          </View>
          {isLoading ? (
            <LoadProfileSkeleton />
          ) : (
            <View style={styles.profileDetail}>
              {user?.avatar !== null ? (
                <Image
                  style={[styles.avatar, {borderRadius: 45 / 2}]}
                  height={45}
                  width={45}
                  source={{uri: `${API_URL}/${avatarSrc}`}}
                  resizeMode="cover"
                  resizeMethod="auto"
                  onError={() => {
                    avatarSrc = null;
                  }}
                />
              ) : (
                <Avatar.Text
                  style={[styles.avatar, {backgroundColor: 'white'}]}
                  color={Color.PRIMARY}
                  size={50}
                  label={user?.name?.slice(0, 1)}
                />
              )}

              <View style={styles.info}>
                <Text style={styles.profileName}>
                  {user?.name || 'Emir Kharisma'}
                </Text>
                <Text style={styles.online}>Online</Text>
              </View>
            </View>
          )}
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
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
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
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          </View>
        </View>
      );
  }
}
