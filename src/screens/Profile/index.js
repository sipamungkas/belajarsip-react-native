import React from 'react';
import {View, ScrollView, TouchableOpacity, StatusBar} from 'react-native';

import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
import {logoutHandler} from '../../store/actions/auth';

import PinIcon from '../../assets/icons/pin-icon.svg';
import LogoutIcon from '../../assets/icons/logout-icon.svg';
import SecurityIcon from '../../assets/icons/security-icon.svg';
import StorageIcon from '../../assets/icons/storage-icon.svg';

import Header from '../../components/Header';
import styles from './styles';

function Profile(props) {
  const {
    authReducer: {user},
  } = props;
  console.log(user);
  const onLogoutHandler = () => {
    props.onLogoutHandler();
    props.navigation.navigate('Login');
  };
  return (
    <View>
      <Header title="Profile" mode={'profile'} user={user} />
      <ScrollView
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
              left={props => (
                <StorageIcon size={20} color="rgba(63, 67, 86, 1)" />
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
        </Card>
        <Card style={styles.section}>
          <Card.Title titleStyle={styles.sectionTitle} title="Help" />
          <TouchableOpacity>
            <Card.Title
              rightStyle={{marginRight: 10}}
              titleStyle={styles.titleStyle}
              title="F.A.Q"
              left={props => (
                <Ionicons
                  name="help-circle"
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
          <TouchableOpacity onPress={onLogoutHandler}>
            <Card.Title
              rightStyle={{marginRight: 10}}
              titleStyle={[styles.titleStyle, {color: 'red'}]}
              title="Logout"
              left={props => <LogoutIcon size={20} />}
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
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogoutHandler: () => dispatch(logoutHandler()),
  };
};

const ConnectedProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ConnectedProfile;
