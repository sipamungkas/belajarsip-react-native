import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {ActivityIndicator, Card} from 'react-native-paper';
import axios from 'axios';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';

import styles from './styles';

import {errorFormatter} from '../../../utils/Error';
import {snackbarError} from '../../../store/actions/snackbar';
import {API_URL} from '@env';
import Color from '../../../Color';
import {durationToTime} from '../../../utils/TimeConverter';

function ForYou(props) {
  const dispatch = useDispatch();
  const [myClassData, setMyClassData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {date} = props;
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const {token} = authReducer.user;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/v1/dashboard/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setMyClassData(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(snackbarError(msg));
        setIsLoading(false);
      });
  }, [token, date, dispatch]);

  return (
    <View>
      {!myClassData && <ActivityIndicator color={Color.PRIMARY} />}
      {myClassData?.length === 0 && (
        <Card style={{padding: 10}}>
          {isLoading ? (
            <ActivityIndicator color={Color.PRIMARY} />
          ) : (
            <Text style={{textAlign: 'center'}}>No Schedule</Text>
          )}
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
                  {durationToTime(item.start_at, item.duration) ||
                    '00.00 - 00.00'}
                </Text>
              </View>
              <View style={{...styles.titleContainer, flex: 2}}>
                <Text style={styles.title}>{item.title || 'untitled'}</Text>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <ProgressCircle
                  percent={item.progress || 0}
                  radius={20}
                  borderWidth={3}
                  color="#3399FF"
                  shadowColor="#fff"
                  bgColor="#fff">
                  <Text style={{fontSize: 14}}>{`${item.progress || 0}%`}</Text>
                </ProgressCircle>
              </View>
            </TouchableOpacity>
          </Card>
        ))}
    </View>
  );
}

export default ForYou;
