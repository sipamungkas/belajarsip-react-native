import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from 'react-native';

import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {logoutHandler} from '../../store/actions/auth';
import {getProfile} from '../../services/api/profile';

import PinIcon from '../../assets/icons/pin-icon.svg';
import LogoutIcon from '../../assets/icons/logout-icon.svg';
import SecurityIcon from '../../assets/icons/security-icon.svg';
import StorageIcon from '../../assets/icons/storage-icon.svg';

import {errorFormatter} from '../../utils/Error';
import {snackbarError, snackbarSuccess} from '../../store/actions/snackbar';

import Header from '../../components/Header';
import styles from './styles';

export default function Profile(props) {
  const dispatch = useDispatch();
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {
    user: {token},
  } = authReducer;
  const onLogoutHandler = () => {
    dispatch(logoutHandler);
  };
  useEffect(() => {
    setIsLoading(true);
    getProfile(token)
      .then(res => {
        setProfile(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        const msg = errorFormatter(err);
        setIsLoading(false);
        dispatch(snackbarError(msg));
      });
  }, [token, dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    getProfile(token)
      .then(res => {
        setProfile(res.data.data);
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(err => {
        const msg = errorFormatter(err);
        setIsLoading(false);
        setRefreshing(false);
        dispatch(snackbarError(msg));
      });
  }, [token, dispatch]);

  console.log(profile);
  return (
    <View>
      <Header
        title="Profile"
        mode={'profile'}
        user={profile}
        isLoading={isLoading}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          ...styles.container,
          paddingBottom: StatusBar.currentHeight + 115,
        }}>
        <Card style={styles.section}>
          <Card.Title titleStyle={styles.sectionTitle} title="Account" />
          <TouchableOpacity>
            <Card.Title
              rightStyle={{marginRight: 10}}
              titleStyle={styles.titleStyle}
              title="Change Name"
              left={() => (
                <Ionicons name="text" size={20} color="rgba(63, 67, 86, 1)" />
              )}
              right={() => (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="rgba(63, 67, 86, 1)"
                />
              )}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Card.Title
              rightStyle={{marginRight: 10}}
              titleStyle={styles.titleStyle}
              title="Phone Numbers"
              left={props => (
                <Ionicons name="call" size={20} color="rgba(63, 67, 86, 1)" />
              )}
              right={props => (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="rgba(63, 67, 86, 1)"
                />
              )}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Card.Title
              rightStyle={{marginRight: 10}}
              titleStyle={styles.titleStyle}
              title="Change password"
              left={props => <PinIcon size={20} color="rgba(63, 67, 86, 1)" />}
              right={props => (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="rgba(63, 67, 86, 1)"
                />
              )}
            />
          </TouchableOpacity>
        </Card>
        <Card style={styles.section}>
          <Card.Title titleStyle={styles.sectionTitle} title="Settings" />
          <TouchableOpacity>
            <Card.Title
              rightStyle={{marginRight: 10}}
              titleStyle={styles.titleStyle}
              title="Chat Settings"
              left={props => (
                <Ionicons
                  name="chatbox-ellipses"
                  size={20}
                  color="rgba(63, 67, 86, 1)"
                />
              )}
              right={props => (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="rgba(63, 67, 86, 1)"
                />
              )}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Card.Title
              rightStyle={{marginRight: 10}}
              titleStyle={styles.titleStyle}
              title="Push Notifications"
              left={props => (
                <Ionicons
                  name="notifications"
                  size={20}
                  color="rgba(63, 67, 86, 1)"
                />
              )}
              right={props => (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="rgba(63, 67, 86, 1)"
                />
              )}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Card.Title
              rightStyle={{marginRight: 10}}
              titleStyle={styles.titleStyle}
              title="Privacy and Security"
              left={props => (
                <SecurityIcon size={20} color="rgba(63, 67, 86, 1)" />
              )}
              right={props => (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="rgba(63, 67, 86, 1)"
                />
              )}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Card.Title
              rightStyle={{marginRight: 10}}
              titleStyle={styles.titleStyle}
              title="Data and Storage"
              left={() => <StorageIcon size={20} color="rgba(63, 67, 86, 1)" />}
              right={() => (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="rgba(63, 67, 86, 1)"
                />
              )}
            />
          </TouchableOpacity>
        </Card>
        <Card style={styles.section}>
          <Card.Title titleStyle={styles.sectionTitle} title="Help" />
          <TouchableOpacity>
            <Card.Title
              rightStyle={{marginRight: 10}}
              titleStyle={styles.titleStyle}
              title="F.A.Q"
              left={() => (
                <Ionicons
                  name="help-circle"
                  size={20}
                  color="rgba(63, 67, 86, 1)"
                />
              )}
              right={() => (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="rgba(63, 67, 86, 1)"
                />
              )}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onLogoutHandler}>
            <Card.Title
              rightStyle={{marginRight: 10}}
              titleStyle={[styles.titleStyle, {color: 'red'}]}
              title="Logout"
              left={() => <LogoutIcon size={20} />}
              right={() => (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="rgba(63, 67, 86, 1)"
                />
              )}
            />
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
}
