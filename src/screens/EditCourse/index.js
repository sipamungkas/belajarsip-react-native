import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  Platform,
  ScrollView,
} from 'react-native';
import {Card, Button} from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {snackbarSuccess, snackbarError} from '../../store/actions/snackbar';
import {setIsLoading} from '../../store/actions/loading';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import Header from '../../components/Header';
// api calls
import {getCategories} from '../../services/api/categories';
import {
  deleteCourse,
  getCourseById,
  updateCourse,
} from '../../services/api/courses';
import {getLevels} from '../../services/api/levels';
import {API_URL} from '@env';

import styles from './styles';
import {errorFormatter} from '../../utils/Error';
import DeleteModal from '../../components/Course/DeleteModal';

export default function UpdateCourse(props) {
  const {courseId, courseName: defaultCourseName} = props.route.params;
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [response, setResponse] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const {
    user: {token},
  } = authReducer;

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
    if (newEndTime.diff(startTime) <= 0) {
      dispatch(snackbarError('End Time must be greater than start time'));
      hideSessionEndPicker();
      return;
    }

    setEndTime(newEndTime);
    hideSessionEndPicker();
  };

  useEffect(() => {
    getCategories(token)
      .then(res => {
        setCategories(res.data.data);
      })
      .catch(err => {
        snackbarError(
          err?.response?.message || err?.message || 'Something went wrong',
        );
      });
    getLevels(token)
      .then(res => {
        setLevels(res.data.data);
      })
      .catch(err => {
        snackbarError(
          err?.response?.message || err?.message || 'Something went wrong',
        );
      });
  }, [token, dispatch]);

  useEffect(() => {
    getCourseById(token, courseId)
      .then(res => {
        const course = res.data.data;
        setStartTime(
          moment(
            `${moment(course.start_date).format('YYYY-MM-DD')} ${
              course.session_start
            }`,
          ),
        );
        setDate(moment(course.start_date).format('YYYY-MM-DD'));
        setEndTime(
          moment(
            `${moment(course.start_date).format('YYYY-MM-DD')} ${
              course.session_start
            }`,
          ).add(course.duration, 'ms'),
        );
        setResponse(
          course?.image ? {uri: `${API_URL}/images/${course.image}`} : null,
        );
        setCourseName(course.name);
        setSelectedCategory(course.category_id);
        setSelectedLevel(course.level_id);
        setDescription(course.description);
        setPrice(course.price || '0');
      })
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(snackbarError(msg));
      });
  }, [token, dispatch, courseId]);

  const resetInput = () => {
    setStartTime();
    setEndTime();
    setResponse();
    setCourseName();
    setSelectedCategory();
    setSelectedLevel();
    setDescription();
    setPrice();
    setDate();
  };

  const updateCourseValidator = () => {
    if (!response) {
      return 'Image can not be empty!';
    }
    if (!courseName) {
      return 'Course name can not be empty!';
    }
    if (!description) {
      return 'Description can not be empty!';
    }
    if (!selectedLevel) {
      return 'Please select Level!';
    }
    if (!selectedCategory) {
      return 'Please select category!';
    }
    if (!price) {
      return 'Please input price, 0 for free!';
    }
    if (!date) {
      return 'Schedule can not be empty!';
    }
    if (!startTime) {
      return 'Start Time can not be empty!';
    }
    if (!endTime) {
      return 'End Time can not be empty!';
    }
    return null;
  };

  const updateHandler = () => {
    dispatch(setIsLoading(true));
    const vaildatorMessage = updateCourseValidator();
    if (vaildatorMessage) {
      dispatch(snackbarError(vaildatorMessage));
      dispatch(setIsLoading(false));
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri:
        Platform.OS === 'android'
          ? response?.uri
          : response.uri.replace('file://', ''),
      name: `course-${Date.now()}.jpg`,
      type: 'image/*',
    });
    formData.append('name', courseName);
    formData.append('description', description);
    formData.append('level', selectedLevel);
    formData.append('category', selectedCategory);
    formData.append('price', price);
    formData.append('start_date', date);
    formData.append('session_start', `${startTime.format('hh:mm')}:00`);
    formData.append('duration', endTime.diff(startTime, 'ms'));
    formData.append('day', moment(date).format('E') - 1);

    updateCourse(token, courseId, formData)
      .then(res => {
        dispatch(snackbarSuccess(res.data.message));
        // resetInput();
        dispatch(setIsLoading(false));
      })
      .catch(err => {
        const errMsg =
          err?.response?.data?.message ||
          err?.message ||
          'Something went wrong!';
        dispatch(setIsLoading(false));
        dispatch(snackbarError(errMsg));
      });
  };

  const deleteHandler = () => {
    setShowDelete(false);
    dispatch(setIsLoading(true));
    deleteCourse(token, courseId)
      .then(res => {
        dispatch(snackbarSuccess('Course Deleted'));
        dispatch(setIsLoading(false));
        setTimeout(() => {
          props.navigation.replace('ActivityMyClass');
        }, 2000);
      })
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(snackbarError(msg));
        dispatch(setIsLoading(false));
      });
  };

  return (
    <View style={styles.container}>
      <Header
        back
        title={defaultCourseName}
        {...props}
        right="delete"
        onRightPress={() => setShowDelete(true)}
      />
      <ScrollView>
        <Card style={styles.container}>
          <Card.Title titleStyle={styles.title} title="Edit Course" />
          <Card.Content>
            <View>
              <Text style={styles.label}>Course Cover</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
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
              <TextInput
                value={courseName}
                placeholder="Input Class Name"
                onChangeText={text => setCourseName(text)}
              />
            </View>
            <View style={[styles.inputContainer]}>
              <Text style={styles.label}>Categories:</Text>
              <ModalSelector
                labelExtractor={data => data.name}
                keyExtractor={data => data.id}
                optionContainerStyle={{backgroundColor: 'white'}}
                cancelStyle={{backgroundColor: 'white'}}
                cancelText="Cancel"
                data={categories}
                initValue="Select something yummy!"
                onChange={option => {
                  setSelectedCategory(option.id);
                }}>
                <TextInput
                  placeholder="Select Category"
                  value={
                    categories?.find(cat => cat.id === selectedCategory)
                      ?.name || null
                  }
                />
              </ModalSelector>
            </View>
            <View style={[styles.inputContainer]}>
              <Text style={styles.label}>Level:</Text>
              <ModalSelector
                labelExtractor={data => data.name}
                keyExtractor={data => data.id}
                optionContainerStyle={{backgroundColor: 'white'}}
                cancelStyle={{backgroundColor: 'white'}}
                cancelText="Cancel"
                data={levels}
                onChange={option => {
                  setSelectedLevel(option.id);
                }}>
                <TextInput
                  placeholder="Select Level"
                  value={
                    levels?.find(level => level.id === selectedLevel)?.name ||
                    null
                  }
                />
              </ModalSelector>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Price:</Text>
              <TextInput
                value={`${price}`}
                placeholder="Input Price ($)"
                onChangeText={text => setPrice(text)}
                keyboardType="decimal-pad"
              />
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
                  value={startTime?.format('hh:mm A') || 'Please select a time'}
                  placeholder="Session Start"
                />
              </Pressable>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>End Time:</Text>
              <Pressable
                onPress={() => {
                  showSessionEndPicker();
                }}>
                <TextInput
                  style={{opacity: 1, color: 'black'}}
                  editable={false}
                  value={endTime?.format('hh:mm A') || 'Please select a time'}
                  placeholder="Session End"
                />
              </Pressable>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.label}>Description:</Text>
              <TextInput
                value={description}
                multiline
                numberOfLines={4}
                style={styles.description}
                onChangeText={text => setDescription(text)}
                placeholder="Please Input Description"
              />
            </View>
            <Button
              mode="contained"
              color="rgba(87, 186, 97, 1)"
              labelStyle={styles.createLabel}
              style={styles.btnCreate}
              theme={{roundness: 25}}
              uppercase={false}
              onPress={updateHandler}>
              Update
            </Button>
            {/* <Button
              mode="contained"
              color={Color.DANGER}
              labelStyle={styles.createLabel}
              style={styles.btnCreate}
              theme={{roundness: 25}}
              uppercase={false}
              onPress={updateHandler}>
              Delete
            </Button> */}
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
          <DeleteModal
            show={showDelete}
            setShow={setShowDelete}
            deleteHandler={deleteHandler}
          />
        </Card>
      </ScrollView>
    </View>
  );
}
