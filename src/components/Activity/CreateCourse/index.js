import React, {useState} from 'react';
import {View, Text, TextInput, Image, Pressable} from 'react-native';
import {Card, Button} from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {snackbarSuccess, snackbarError} from '../../../store/actions/snackbar';
import {useDispatch} from 'react-redux';

import styles from './styles';

export default function CreateCourse() {
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [response, setResponse] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showSessionStartPicker = () => {
    setShowStart(true);
  };

  const hideSessionStartPicker = () => {
    setShowStart(false);
  };

  const showSessionEndPicker = () => {
    setShowEnd(true);
  };

  const hideSessionEndPicker = () => {
    setShowEnd(false);
  };

  const handleConfirm = selectedDate => {
    setDate(moment(selectedDate).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const handleConfirmStart = selectedTime => {
    setStartTime(moment(selectedTime));
    hideSessionStartPicker();
  };

  const handleConfirmEnd = selectedTime => {
    const newEndTime = moment(selectedTime);
    if (!startTime) {
      dispatch(snackbarError('Please select start time first!'));
      hideSessionEndPicker();
      return;
    }
    if (startTime.diff(endTime) <= 0) {
      dispatch(snackbarError('End Time must be greater than start time'));
      hideSessionEndPicker();
      return;
    }

    setEndTime(newEndTime);
    hideSessionEndPicker();
  };

  const data = [
    {key: 0, section: true, label: 'Categories'},
    {key: 1, label: 'Software'},
    {key: 2, label: 'Finance'},
  ];

  return (
    <Card>
      <Card.Title titleStyle={styles.title} title="Create new course" />
      <Card.Content>
        <View>
          <Text style={styles.label}>Course Cover</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button
              onPress={() => {
                launchCamera(
                  {
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 200,
                    maxWidth: 200,
                  },
                  image => {
                    setResponse(image);
                  },
                );
              }}>
              Take Photo
            </Button>
            <Button
              onPress={() => {
                launchImageLibrary(
                  {
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 200,
                    maxWidth: 200,
                  },
                  image => {
                    setResponse(image);
                  },
                );
              }}>
              choose image
            </Button>
          </View>
          {response && (
            <Image
              style={{width: '100%', height: 100}}
              resizeMode="contain"
              source={{uri: response.uri}}
            />
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Class Name:</Text>
          <TextInput placeholder="Input Class Name" />
        </View>
        <View style={[styles.inputContainer]}>
          <Text style={styles.label}>Categories:</Text>
          <ModalSelector
            optionContainerStyle={{backgroundColor: 'white'}}
            cancelStyle={{backgroundColor: 'white'}}
            cancelText="Cancel"
            data={data}
            initValue="Select something yummy!"
            onChange={option => {
              alert(`${option.label} (${option.key}) nom nom nom`);
            }}>
            <TextInput placeholder="Select Category" />
          </ModalSelector>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price:</Text>
          <TextInput keyboardType="decimal-pad" placeholder="Input Price ($)" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Schedule:</Text>
          <Pressable
            onPress={() => {
              showDatePicker();
            }}>
            <TextInput
              style={{opacity: 1, color: 'black'}}
              editable={false}
              value={date}
              placeholder="Select date"
              onFocus={() => {
                showDatePicker();
              }}
            />
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Start Time:</Text>
          <Pressable
            onPress={() => {
              showSessionStartPicker();
            }}>
            <TextInput
              style={{opacity: 1, color: 'black'}}
              editable={false}
              value={startTime?.format('hh:mm') || 'Please select a time'}
              placeholder="Session Start"
            />
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Time:</Text>
          <Pressable
            onPress={() => {
              showSessionEndPicker();
            }}>
            <TextInput
              style={{opacity: 1, color: 'black'}}
              editable={false}
              value={endTime?.format('hh:mm') || 'Please select a time'}
              placeholder="Session End"
            />
          </Pressable>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.description}
            placeholder="Please Input Description"
          />
        </View>
      </Card.Content>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={showStart}
        mode="time"
        onConfirm={handleConfirmStart}
        onCancel={hideSessionStartPicker}
      />
      <DateTimePickerModal
        isVisible={showEnd}
        mode="time"
        onConfirm={handleConfirmEnd}
        onCancel={hideSessionEndPicker}
      />
    </Card>
  );
}
