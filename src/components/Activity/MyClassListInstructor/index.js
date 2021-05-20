import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MyClassItemInstructor from '../MyClassItemInstructor';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';

import {API_URL} from '@env';

import styles from './styles';
import Color from '../../../Color';
import axios from 'axios';

function MyClassList(props) {
  const [myCourses, setMyCourses] = useState();
  const [info, setInfo] = useState({});
  const {token} = props.authReducer.user;
  useEffect(() => {
    axios
      .get(`${API_URL}/v1/courses/my-class?limit=3`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setMyCourses(res.data.data);
        setInfo(res.data.info);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token]);

  return (
    <View>
      <Text style={styles.title}>My class</Text>
      <View
        style={{flexDirection: 'row', paddingHorizontal: 10, marginBottom: 5}}>
        <View style={{flex: 4}}>
          <Text style={styles.thead}> Class Name</Text>
        </View>
        <View style={{flex: 2, alignItems: 'center'}}>
          <Text style={styles.thead}>Student</Text>
        </View>
        <View style={{width: 20}}></View>
      </View>
      {!myCourses && (
        <ActivityIndicator animating={true} color={Color.PRIMARY} />
      )}
      {myCourses?.length === 0 && (
        <View>
          <Text style={{textAlign: 'center', marginTop: 10}}>
            You dont have any class
          </Text>
        </View>
      )}
      {myCourses?.length > 0 &&
        myCourses.map(item => (
          <MyClassItemInstructor {...props} key={item.id} course={item} />
        ))}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2%',
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ActivityMyClass');
          }}>
          <Text style={{fontSize: 12}}>view all</Text>
        </TouchableOpacity>
        <Ionicons name="chevron-forward" size={20} />
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
  };
};

const ConnectedMyClassList = connect(mapStateToProps)(MyClassList);

export default ConnectedMyClassList;
