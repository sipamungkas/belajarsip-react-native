import React, {useState, useEffect} from 'react';
import {ScrollView, View, StatusBar, Pressable, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import News from '../../../components/Dashboard/News';
import MyClassInstructor from '../../../components/Dashboard/MyClassInstructor';
import Header from '../../../components/Header';

import styles from './styles';

function DashboardInstructor(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [dateInAWeek, setDateInAWeek] = useState([
    moment(date).startOf('week'),
  ]);

  useEffect(() => {
    const weekStart = moment(date).startOf('week');
    const dates = [weekStart];
    for (let i = 1; i < 7; i++) {
      dates.push(moment(weekStart).days(i));
    }
    setDateInAWeek(dates);
  }, [date]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = selectedDate => {
    setDate(moment(selectedDate).format('YYYY-MM-DD'));

    hideDatePicker();
  };

  const newsData = [
    {
      id: 1,
      title: 'Microsoft try to implement work from home forever',
      image: '',
    },
    {
      id: 2,
      title: '2 Microsoft try to implement work from home forever',
      image: '',
    },
  ];

  return (
    <View>
      <Header title="Dashboard" mode="dashboard" />
      <ScrollView
        style={[
          styles.container,
          {paddingBottom: StatusBar.currentHeight + 115},
        ]}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <News data={newsData} />
        <MyClassInstructor
          activeDate={date}
          setActiveDate={setDate}
          dateInAWeek={dateInAWeek}
          date={date}
          showDatePicker={showDatePicker}
        />
      </ScrollView>
    </View>
  );
}
export default DashboardInstructor;
