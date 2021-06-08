import React, {useRef, useState, useEffect} from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Animated,
} from 'react-native';
import {useDispatch} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ImageHeader from '../../components/MyClassDetail/ImageHeader';
import Header from '../../components/Header';
import Information from '../../components/MyClassDetail/Information';
import ProgressList from '../../components/MyClassDetail/Progress';
import {getCourseById} from '../../services/api/courses';

import styles from './styles';
import Color from '../../Color';
import {errorFormatter} from '../../utils/Error';
import {snackbarError} from '../../store/actions/snackbar';

export default function MyClassDetail(props) {
  const dispatch = useDispatch();
  const authReducer = useSelector(state => state.authReducer, shallowEqual);
  const {token} = authReducer.user;
  const {courseId, courseName} = props.route.params;
  const [course, setCourse] = useState({});
  const [index, setIndex] = React.useState(0);
  const contentRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const opacity = fadeAnim.interpolate({
    inputRange: [0, 250],
    outputRange: [0, 1],
  });

  const menu = ['Information', 'Class Progress', 'Class Discussion'];
  const renderTabContent = () => {
    switch (index) {
      case 1:
        return <ProgressList token={token} courseId={courseId} />;
      case 2:
        return <Information course={course} />;
      default:
        return <Information course={course} />;
    }
  };

  useEffect(() => {
    getCourseById(token, courseId)
      .then(res => {
        setCourse(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => {
        const msg = errorFormatter(err);
        dispatch(snackbarError(msg));
      });
  }, [token, courseId, dispatch]);
  // console.log(courseId, courseId, courseName, course);
  return (
    <View style={{flex: 1, backgroundColor: Color.DEFAULT_BACKGROUND}}>
      <Header back title={courseName} {...props} />
      <ScrollView
        ref={contentRef}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: fadeAnim}},
            },
          ],
          {
            useNativeDriver: false,
          },
        )}>
        <ImageHeader course={course} />
        <View style={styles.menuList}>
          {menu.map((item, activeIndex) => (
            <TouchableNativeFeedback
              key={activeIndex}
              onPress={() => setIndex(activeIndex)}>
              <View
                style={[
                  styles.menuContainer,
                  index === activeIndex ? styles.active : '',
                ]}>
                <Text
                  style={[
                    styles.menuText,
                    index === activeIndex ? styles.activeText : '',
                  ]}>
                  {item}
                </Text>
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>
        <View
          style={{
            backgroundColor: Color.DEFAULT_BACKGROUND,
            paddingHorizontal: 15,
          }}>
          {renderTabContent()}
        </View>
      </ScrollView>
      <Animated.View style={[styles.fab, {opacity: opacity}]}>
        <TouchableNativeFeedback
          onPress={() => contentRef.current.scrollTo({y: 0})}>
          <Ionicons name="chevron-up" color="white" size={20} />
        </TouchableNativeFeedback>
      </Animated.View>
    </View>
  );
}
