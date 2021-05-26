import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ActivityIndicator, Card} from 'react-native-paper';
import axios from 'axios';

import {useDispatch, useSelector, shallowEqual} from 'react-redux';

import styles from './styles';
import StudentIcon from '../../../assets/icons/student-icon.svg';
import DateItem from '../DateItem';

import {API_URL} from '@env';
import Color from '../../../Color';
import {durationToTime} from '../../../utils/TimeConverter';
import {errorFormatter} from '../../../utils/Error';
import {snackbarError} from '../../../store/actions/snackbar';

function ForYou(props) {
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const dispatch = useDispatch();
  const [myClassData, setMyClassData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {date, dateInAWeek, activeDate, setActiveDate} = props;

  const {token} = authReducer.user;

  useEffect(() => {
    setMyClassData([]);
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
      <View style={styles.dateList}>
        {dateInAWeek.map(data => (
          <DateItem
            key={data.format('D')}
            date={data.date()}
            day={data.format('dd')}
            active={data.format('YYYY-MM-DD') === activeDate}
            onPress={() => setActiveDate(data.format('YYYY-MM-DD'))}
          />
        ))}
      </View>

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
            key={index}
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
              <View style={styles.studentContainer}>
                <Text style={styles.studentCount}>{item?.students || '0'}</Text>
                <StudentIcon width={22} height={22} />
              </View>
            </TouchableOpacity>
          </Card>
        ))}
    </View>
  );
}

export default ForYou;
