import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {Card} from 'react-native-paper';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {snackbarError} from '../../../store/actions/snackbar';
import Color from '../../../Color';

import {getAllCourseByDate} from '../../../services/api/dashboard';
import styles from './styles';
import {errorFormatter} from '../../../utils/Error';

function AllSchedule(props) {
  const dispatch = useDispatch();
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {token} = authReducer.user;
  const {date} = props;

  useEffect(() => {
    if (!token) {
      return;
    }
    setIsLoading(true);
    getAllCourseByDate(token, date)
      .then(res => {
        const newData = res.data.data;
        setData(newData);
        setIsLoading(false);
      })
      .catch(err => {
        const msg = errorFormatter(err);

        dispatch(snackbarError(msg));
        setIsLoading(false);
      });
  }, [token, date, dispatch]);

  const arrayOfStartTime = [];
  for (const course of data) {
    if (!arrayOfStartTime.includes(course.start_at)) {
      arrayOfStartTime.push(course.start_at);
    }
  }

  const groupedByTime = [];

  for (const startTime of arrayOfStartTime) {
    groupedByTime.push({
      startAt: startTime,
      courseList: data.filter(course => course.start_at === startTime),
    });
  }

  return (
    <View>
      {!groupedByTime && <ActivityIndicator color={Color.PRIMARY} />}
      {groupedByTime?.length === 0 && (
        <Card style={{padding: 10}}>
          {isLoading ? (
            <ActivityIndicator color={Color.PRIMARY} />
          ) : (
            <Text style={{textAlign: 'center'}}>No Schedule</Text>
          )}
        </Card>
      )}
      {groupedByTime.map((item, index) => (
        <View key={index} style={{flexDirection: 'row', marginVertical: 5}}>
          <Card style={styles.timeContainer} elevation={2}>
            <Text style={styles.time}>{item.startAt || '00.00 - 00.00'}</Text>
          </Card>
          <View style={{flex: 3, flexDirection: 'column'}}>
            {item.courseList.map((course, index2) => (
              <Card
                key={index2}
                elevation={2}
                style={{marginVertical: 3}}
                theme={{roundness: 10}}>
                <TouchableOpacity style={styles.item}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                      {course.title || 'untitled'}
                    </Text>
                  </View>
                  <View>
                    {/* <ProgressCircle
                      percent={course.progress || 0}
                      radius={20}
                      borderWidth={3}
                      color="#3399FF"
                      shadowColor="#fff"
                      bgColor="#fff">
                      <Text style={{fontSize: 14}}>{`${
                        course.progress || 0
                      }%`}</Text>
                    </ProgressCircle> */}
                  </View>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

export default AllSchedule;
