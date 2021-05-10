import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {ActivityIndicator, Card} from 'react-native-paper';
import axios from 'axios';

import styles from './styles';

import {API_URL} from '@env';
import Color from '../../../Color';

export default function ForYou(props) {
  const [myClassData, setMyClassData] = useState();
  // const date = '2021-03-29';
  const {date} = props;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJuYW1lIjoiQnVyaGFuIFVwZGF0ZWEiLCJyb2xlX2lkIjoyLCJpYXQiOjE2MjA2MDk3MDksImV4cCI6MTYyMDY5NjEwOSwiaXNzIjoiQkVMQUpBUlNJUCJ9.04ndNaHCYYS_bfaW8Hb1vLD6cvmgQAZ-q-ADOZsC84U';
  useEffect(() => {
    axios
      .get(`${API_URL}/v1/dashboard/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setMyClassData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token, date]);

  return (
    <View>
      {!myClassData && <ActivityIndicator color={Color.PRIMARY} />}
      {myClassData?.length === 0 && (
        <Card style={{padding: 10}}>
          <Text style={{textAlign: 'center'}}>No Schedule</Text>
        </Card>
      )}
      {myClassData &&
        myClassData.map((item, index) => (
          <Card
            key={item.id}
            elevation={2}
            style={{marginVertical: 3}}
            theme={{roundness: 10}}>
            <TouchableOpacity style={styles.item}>
              <View style={{flex: 1}}>
                <Text style={styles.time}>
                  {' '}
                  {item.start_at || '00.00 - 00.00'}
                </Text>
              </View>
              <View style={{...styles.titleContainer, flex: 2}}>
                <Text style={styles.title}>{item.title || 'untitled'}</Text>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <ProgressCircle
                  percent={item.progress | 50}
                  radius={20}
                  borderWidth={3}
                  color="#3399FF"
                  shadowColor="#fff"
                  bgColor="#fff">
                  <Text style={{fontSize: 14}}>{`${item.progress | 50}%`}</Text>
                </ProgressCircle>
              </View>
            </TouchableOpacity>
          </Card>
        ))}
    </View>
  );
}
