import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MyClassItem from '../MyClassItem';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator} from 'react-native-paper';

import {API_URL} from '@env';

import styles from './styles';
import Color from '../../../Color';
import axios from 'axios';

export default function MyClassList(props) {
  const [myCourses, setMyCourses] = useState();
  const [info, setInfo] = useState({});
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJuYW1lIjoiQnVyaGFuIFVwZGF0ZWEiLCJyb2xlX2lkIjoyLCJpYXQiOjE2MjA2NjE0ODUsImV4cCI6MTYyMDc0Nzg4NSwiaXNzIjoiQkVMQUpBUlNJUCJ9.6yArS41aouxWaBt1kq2FSL-pmxDmrV77oqBX4ZYcgj0';
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
          <Text style={styles.thead}>Progress</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.thead}>Score</Text>
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
        myCourses.map(item => <MyClassItem key={item.id} course={item} />)}

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