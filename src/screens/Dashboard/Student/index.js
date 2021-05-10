import React, {useState} from 'react';
import {ScrollView, View, StatusBar} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import News from '../../../components/Dashboard/News';
import MyClass from '../../../components/Dashboard/MyClass';
import Header from '../../../components/Header';

import styles from './styles';

export default function DashboardStudent(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [tab, setTab] = useState(2);
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

  const classData = [
    {
      id: 1,
      title: 'Introduction to Banking Finance',
      time: '08.00 - 09.40',
      progress: 80,
    },
    {id: 2, title: 'History of Europe', time: '11.00 - 11.40', progress: 25},
  ];

  console.log(date);
  return (
    <View>
      <Header title="Dashboard" />
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
        <MyClass date={date} data={classData} showDatePicker={showDatePicker} />
      </ScrollView>
    </View>
  );
}
