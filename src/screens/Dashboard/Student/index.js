import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import News from '../../../components/Dashboard/News';
import MyClass from '../../../components/Dashboard/MyClass';

import styles from './styles';

export default function DashboardStudent(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [tab, setTab] = useState(2);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', moment(date).format('YYYY-MM-DD'));
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

  return (
    <ScrollView style={styles.container}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <News data={newsData} />
      <MyClass data={classData} showDatePicker={showDatePicker} />
    </ScrollView>
  );
}
