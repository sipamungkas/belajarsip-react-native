import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ActivityIndicator, Card} from 'react-native-paper';
import axios from 'axios';
import {connect} from 'react-redux';

import styles from './styles';
import StudentIcon from '../../../assets/icons/student-icon.svg';
import DateItem from '../DateItem';

import {API_URL} from '@env';
import Color from '../../../Color';

function ForYou(props) {
  const [myClassData, setMyClassData] = useState();
  const {date, dateInAWeek, activeDate, setActiveDate} = props;

  const {token} = props.authReducer.user;

  useEffect(() => {
    axios
      .get(`${API_URL}/v1/dashboard/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data.data);
        setMyClassData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token, date]);

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

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
  };
};

const ConnectedForYou = connect(mapStateToProps)(ForYou);

export default ConnectedForYou;
